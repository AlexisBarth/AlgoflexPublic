import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, WebSocket } from 'ws';

import { CodingQuestion } from 'src/problems/coding-questions/entities/coding-question.entity';
import { User } from 'src/users/entity';
import { FirebaseStrategy } from 'src/auth/strategies';
import { Submission } from 'src/problems/submissions/entities/submission.entity';
import { CompileRequestEvent, DockerTestResult } from '../models';
import BuildListener from './build_listener';

@WebSocketGateway({ path: '/compile' })
export class BuildGateway implements OnGatewayDisconnect, OnGatewayConnection {

  constructor(
    @InjectRepository(CodingQuestion)
    private readonly codingQuestionRepository: Repository<CodingQuestion>,
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,
    private readonly firebaseStrategy: FirebaseStrategy,
  ) {}

  @WebSocketServer()
  server: Server;
  private buildListener: BuildListener | null = null;
  private logger: Logger = new Logger('BuildGateway');
  private execute = false;
  private solution = '';
  private questionId = '';
  private userToken: string;

  @SubscribeMessage('compile-request')
  async handleCompileRequest(client: any, event: CompileRequestEvent): Promise<void> {
    if (this.buildListener !== null) {
      return;
    }

    this.userToken = event.token;
    this.questionId = event.questionId;
    const codingQuestion = await this.getCodingQuestion(this.questionId);
    this.solution = event.code;
    this.buildListener = await BuildListener.create(event.code, codingQuestion.testCases);
    this.execute = event.execute;

    client.send(
      JSON.stringify({
        state: 1,
        executeLink: this.buildListener.getExecuteLink(),
        compileLink: this.buildListener.getCompileLink(),
      })
    );
  }

  @SubscribeMessage('execute-request')
  async handle(client: WebSocket): Promise<void> {
    if (this.buildListener === null) {
      return;
    }

    const user = await this.fetchUser(this.userToken);
    const codingQuestion = await this.getCodingQuestion(this.questionId);
    const hasCompiled = await this.buildListener.build();
    let status = DockerTestResult.NotCompiled;

    client.send(JSON.stringify({ state: 2, hasCompiled }));

    if (hasCompiled && this.execute) {
      await this.buildListener.execute();
      status = await this.buildListener.getStatus();
      client.send(JSON.stringify({ state: 3, hasExecuted: this.buildListener.isExecuted() }));
    }

    this.submitProblem({
      language: 'cpp',
      questionId: codingQuestion.uid,
      solution: this.solution,
      userId: user.uid,
      status,
    });
    this.removeDocker();
  }

  handleDisconnect(_client: WebSocket) {
    this.logger.log(`Disconnected`);
    this.removeDocker();
  }

  async handleConnection(_client: WebSocket, _args: any) {
    this.logger.log(`WebSocket Client sucessfully connected`);
  }

  private async fetchUser(token: string): Promise<User> {
    const user = await this.firebaseStrategy.validate(token);
    if (!user) {
      this.logger.error('No user found on compile request');
    }
    return user;
  }

  private removeDocker() {
    if (this.buildListener != null) {
      this.buildListener.destroyDocker();
      this.buildListener = null;
      this.execute = false;
    }
  }

  private async getCodingQuestion(questionId: string): Promise<CodingQuestion> {
    const codingQuestion = await this.codingQuestionRepository.findOne(questionId);
    if (!codingQuestion) {
      throw new Error(`No coding question found with the id #${questionId} for the compilation request`);
    }
    return codingQuestion;
  }

  private async submitProblem(submission: Partial<Submission>) {
    await this.submissionRepository.create(submission);
  }
}

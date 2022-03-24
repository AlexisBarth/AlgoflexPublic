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
import { Server } from 'ws';

import { CodingQuestion } from 'src/problems/coding-questions/entities/coding-question.entity';
import { Submission } from 'src/problems/submissions/entities/submission.entity';
import BuildListener from './build_listener';
import { CompileRequestEvent, DockerTestResult } from '../models';

@WebSocketGateway()
export class BuildGateway implements OnGatewayDisconnect, OnGatewayConnection {

  constructor(
    @InjectRepository(CodingQuestion)
    private readonly codingQuestionRepository: Repository<CodingQuestion>,
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,
  ) {}

  @WebSocketServer()
  server: Server;
  private buildListener: BuildListener | null = null;
  private logger: Logger = new Logger('BuildGateway');
  private execute = false;
  private solution = '';

  @SubscribeMessage('compile-request')
  async handleCompileRequest(client: any, event: CompileRequestEvent): Promise<void> {
    if (this.buildListener !== null) {
      return;
    }

    // TODO: const questionId = event.codingQuestionId;
    const questionId = '1';
    const codingQuestion = await this.getCodingQuestion(questionId);
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
  // this.buildListener = await BuildListener.create(
  //   event.code,
  //   `{
  //       "exercice": [
  //           {
  //               "entree": ["30"],
  //               "sorties": ["a"],
  //               "maxtime": 30000,
  //               "maxmemory": 10
  //           },
  //           {
  //               "entree": ["8"],
  //               "sorties": ["a"],
  //               "maxtime": 30000,
  //               "maxmemory": 10
  //           }
  //       ]
  //   }`,
  // );

  @SubscribeMessage('execute-request')
  async handle(client: any): Promise<void> {
    if (this.buildListener === null) {
      return;
    }

    const questionId = '1';
    const codingQuestion = await this.getCodingQuestion(questionId);
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
      userId: 'jean-paul',
      status,
    });
    this.removeDocker();
  }

  handleDisconnect(_client: WebSocket) {
    this.logger.log(`Disconnected`);
    this.removeDocker();
  }

  handleConnection(_client: WebSocket, ..._args: any[]) {
    this.logger.log(`WebSocket Client sucessfully connected`);
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
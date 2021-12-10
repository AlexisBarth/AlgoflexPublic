import { Entity, PrimaryColumn, Column, JoinColumn } from 'typeorm';
import { SubmissionStatistic } from './submission-statistics';

@Entity()
export class CodingQuestion {
  @PrimaryColumn()
  uid: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  theme: string;

  @Column()
  prompt: string;

  @JoinColumn()
  submissionStatistics?: SubmissionStatistic;
}

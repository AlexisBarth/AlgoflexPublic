import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class CodingQuestion {
  @PrimaryColumn({ unique: true })
  uid: string;

  @Column({ nullable: true })
  name: string;

  @Column()
  description: string;

  @Column()
  theme: string;

  @Column()
  prompt: string;

  // @Column()
  // submissionStatistics: SubmissionStatistic;
}

// class SubmissionStatistic {
//   correctCount: number;
//   failureCount: number;
// }

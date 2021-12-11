import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SubmissionStatistic {
  @PrimaryGeneratedColumn("uuid")
  uid: string;

  @Column({ default: 0 })
  correctCount: number;

  @Column({ default: 0 })
  failureCount: number;
}

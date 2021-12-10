import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserMeta {
  @Exclude()
  @PrimaryGeneratedColumn("uuid")
  uid: string;

  @Exclude()
  @Column()
  userId: string;

  @Column()
  questionId: string;

  @Column()
  userCode: string;
}

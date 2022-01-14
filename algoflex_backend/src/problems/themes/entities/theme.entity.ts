import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Theme {
  @PrimaryGeneratedColumn("uuid")
  uid: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  imageUrl: string;
}

import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column()
  mail: string;

  @Column()
  favorite_langage: string;

  @Column()
  last_login: Date;

  @Column()
  created_at: Date;

  @Column()
  role: number;
}

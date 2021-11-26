import { Problem } from 'src/problems/entities/problem.entity';
import { User } from 'src/users/entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';

@Entity()
export class Theme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  imageUrl: string;

  @OneToMany(() => Problem, (problem) => problem.theme)
  problems: Problem[];

  @ManyToMany(() => User, (user) => user.favoriteThemes)
  users: User[];
}

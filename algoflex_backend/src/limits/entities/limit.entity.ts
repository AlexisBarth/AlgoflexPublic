import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, ManyToMany } from "typeorm";

@Entity()
export class Limit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cpus: number;

  @Column()
  memory: string;
}
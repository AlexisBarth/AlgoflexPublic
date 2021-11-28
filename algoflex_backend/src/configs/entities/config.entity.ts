import { Limit } from "src/limits/entities";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, ManyToMany, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class Config {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Limit)
  @JoinColumn()
  limits: Limit;
}

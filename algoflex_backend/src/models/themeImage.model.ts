import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class ThemeImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  url: string;
}

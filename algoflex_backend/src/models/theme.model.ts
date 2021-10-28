import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Theme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column()
  desc: string;

  @Column()
  image: string;
}

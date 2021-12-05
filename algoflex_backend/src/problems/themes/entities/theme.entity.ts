import { User } from 'src/users/entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Theme {
  @PrimaryGeneratedColumn("uuid")
  uid: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  imageUrl: string;

  @ManyToMany(() => User, (user) => user.favoriteThemes)
  users: User[];
}

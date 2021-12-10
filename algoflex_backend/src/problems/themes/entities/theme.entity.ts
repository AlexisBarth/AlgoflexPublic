import { User } from 'src/users/entity';
import { Entity, PrimaryColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Theme {
  @PrimaryColumn()
  uid: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToMany(() => User, (user) => user.favoriteThemes)
  users: User[];
}

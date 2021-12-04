import { User } from 'src/users/entity';
import { Entity, PrimaryColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Theme {
  @PrimaryColumn({ unique: true })
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

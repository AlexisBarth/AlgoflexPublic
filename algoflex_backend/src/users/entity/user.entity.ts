import { Role } from './role.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Transform, Type } from 'class-transformer';
import { Theme } from 'src/themes/entities';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column()
  salt: string;

  @Column({ nullable: true })
  favoriteLangage: string;

  @JoinTable()
  @ManyToMany(() => Theme, (theme) => theme.users, {
    cascade: true,
  })
  favoriteThemes: Theme[];

  @Column({ nullable: true })
  lastLogin: string;

  @Column({ nullable: true })
  createdAt: string;

  @Transform((roles) => roles.value.map((role) => role.name), { toPlainOnly: true })
  @Type(() => Role)
  @JoinTable()
  @ManyToMany(() => Role, (role) => role.name, {
    cascade: true,
  })
  roles?: Role[];
}

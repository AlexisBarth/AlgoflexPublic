import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { Theme } from 'src/problems/themes/entities';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryColumn({ unique: true })
  uid: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  favoriteLangage?: string;

  @JoinTable()
  @ManyToMany(() => Theme, (theme) => theme.users, {
    cascade: true,
  })
  favoriteThemes?: Theme[];

  @Column({ nullable: true })
  lastLogin: number;

  @Column({ nullable: true })
  createdAt: string;

  @ApiProperty({ enum: ['Admin', 'User']})
  @Column()
  role: string;
}

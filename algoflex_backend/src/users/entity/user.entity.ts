import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryColumn({ unique: true })
  uid: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  favoriteLangage?: string;

  @Column("text", { array: true, nullable: true })
  favoriteThemes?: string[];

  @Column({ nullable: true })
  lastLogin: number;

  @Column({ nullable: true })
  createdAt: string;

  @ApiProperty({ enum: ['Admin', 'User']})
  @Column()
  role: string;
}

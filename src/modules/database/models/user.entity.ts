import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity('user')
export class User extends BaseEntity {
  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  salt: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'simple-array', array: true })
  links: string[];

  @Column({ type: 'enum', enum: Role, nullable: false, default: Role.USER })
  role: Role;
}

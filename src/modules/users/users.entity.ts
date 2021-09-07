import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
}from 'typeorm';
  import { UserRole } from './users.cache'
  import * as bcrypt from 'bcrypt';
  
@Entity({ name: 'users' })
  export class Users extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column()
    name: string;

  }
  
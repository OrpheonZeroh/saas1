import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
}from 'typeorm';
import { UserRole } from './users.cache'
import * as bcrypt from 'bcrypt';
  
@Entity({ name: 'users' })
  export class Users extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({type: 'enum', enum: UserRole, default: UserRole.USER})
  role: UserRole;

  @BeforeInsert()
    async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }

}
  
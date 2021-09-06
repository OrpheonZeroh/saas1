import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { UserRole } from './users.cache'
  import * as bcrypt from 'bcrypt';
  
  @Entity({ name: 'users' })
  export class Users extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column()
    name: string;

    @Column()
    lastname: string;
  
    @Column({
      unique: true,
    })
    email: string;

    @Column()
    celular: number;

    @Column({type: 'enum', enum: UserRole, default: UserRole.USER})
    role: UserRole;
  
    @Column()
    password: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @BeforeInsert()
    async setPassword(password: string) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(password || this.password, salt);
    }

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }
  }
  
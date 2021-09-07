import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../users/users.cache'

@Entity({ name: 'tenants' })
  export class Tenants extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column()
    name: string;

}
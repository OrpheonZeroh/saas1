import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';


@Entity({ name: 'tenants' })
  export class Tenants extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Column()
  name: string;
}
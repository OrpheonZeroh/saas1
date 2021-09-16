import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import { TenantRoles } from './tenants.roles'
@Entity({ name: 'tenants' })
  export class Tenants extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  celular_agent: number;

  @Column()
  org_phone: number;

  @Column({type: 'enum', enum: TenantRoles, default: TenantRoles.ADMIN})
  role: TenantRoles;

  @Column({select: false})
  password: string;

  @Column()
  org_name: string;

  @Column({default: true})
  status: boolean;

  @Column()
  logo: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;


  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
    this.name = this.name.toLowerCase();
  }
  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }

}
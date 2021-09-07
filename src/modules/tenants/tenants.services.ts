import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { CreateTenantDto, ReadTenantDto } from "../tenants/tenants.cache";
import { Tenants } from "./tenants.entity";

@Injectable()
export class TenantServices {
    constructor(
      @InjectRepository(Tenants)
      private readonly tenantRepository: Repository<Tenants>,
    ) {}
  
    async findAll(): Promise<ReadTenantDto[]> {
      const tenants = await this.tenantRepository.find();
  
      return tenants.map(tenant => plainToClass(ReadTenantDto, tenant));
    }
  
    async findOne(name: string) {
      return await this.tenantRepository.findOne({name});
    }
  
    async create(tenant: CreateTenantDto): Promise<ReadTenantDto> {
      const createdTenant = await this.tenantRepository.save(tenant);
  
      return plainToClass(ReadTenantDto, createdTenant);
    }
}

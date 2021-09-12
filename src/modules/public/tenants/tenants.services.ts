import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { NotFoundError } from 'rxjs';
import { Repository } from 'typeorm';

import { CreateTenantDto, ReadTenantDto, UpdateTenantDto } from "./tenants.cache";
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
    const tenant = await this.tenantRepository.findOne({name});
    if (!tenant) throw new NotFoundException('Tenant does not exists')
    return tenant
  }
  
  async create(tenant: CreateTenantDto): Promise<ReadTenantDto> {
    const createdTenant = await this.tenantRepository.save(tenant);
    return plainToClass(ReadTenantDto, createdTenant);
  }

  async updateT(id: string, tenants: UpdateTenantDto): Promise<ReadTenantDto> {
    const tenant = await this.tenantRepository.findOne({ id })
    const updateTenant = this.tenantRepository.create({
      ...tenant,
      ...tenants
    })
    return await this.tenantRepository.save(updateTenant)
  }

  async findOne2(id: string) {
    return await this.tenantRepository.findOne({id});
  }

  async delete(name: string) {
    try {
      const tenant = await this.findOne(name);
      return await this.tenantRepository.remove(tenant)
    } catch (error) {
      console.error(error)
    }
    
  }

}

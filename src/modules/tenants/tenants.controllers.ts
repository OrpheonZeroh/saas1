import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateTenantDto, ReadTenantDto } from './tenants.cache';
import { TenantServices } from './tenants.services';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantService: TenantServices) {}

  @Get()
  findAll(): Promise<ReadTenantDto[]> {
    return this.tenantService.findAll();
  }

  @Post()
  create(@Body() tenant: CreateTenantDto): Promise<ReadTenantDto> {
    return this.tenantService.create(tenant);
  }
}
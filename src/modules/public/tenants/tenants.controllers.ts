import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { CreateTenantDto, ReadTenantDto, UpdateTenantDto } from './tenants.cache';
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

  @Put(':id')
  updateTenant( @Param('id') id: string, @Body()tenantFields: UpdateTenantDto){
    return this.tenantService.updateT(id, tenantFields)
  }

  @Get(':name')
  findOne1(@Param('name') name: string){
    return  this.tenantService.findOne(name)
  }

  @Get(':id')
  findOne2(@Param('id') id: string){
    return this.tenantService.findOne2(id)
  }

  @Delete(':name')
  deleteOne(
    @Param('name') name:string
  ){
    console.log('hear', name)
    const data = this.tenantService.delete(name)
    return {message: 'Tenant removed'}
  }

}
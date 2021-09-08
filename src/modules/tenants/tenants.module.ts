import {
    BadRequestException,
    MiddlewareConsumer,
    Module,
    RequestMethod,
  } from '@nestjs/common';
  import { TenantServices } from './tenants.services';
  import { TenantsController } from './tenants.controllers';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { Tenants } from './tenants.entity';
  import { NextFunction, Request } from 'express';
  import { Connection, createConnection, getConnection } from 'typeorm';
  import { ConfigService } from '@nestjs/config';
  import { Users } from '../users/users.entity';
  import { TenantProvider } from './tenants.provider';
  
  @Module({
    imports: [TypeOrmModule.forFeature([Tenants])],
    providers: [TenantServices, TenantProvider],
    exports: [TenantProvider],
    controllers: [TenantsController],
  })
  export class TenancyModule {
    constructor(
      private readonly connection: Connection,
      private readonly configService: ConfigService,
      private readonly tenantService: TenantServices,
    ) {}
  
    configure(consumer: MiddlewareConsumer): void {
      consumer
        .apply(async (req: Request, res: Response, next: NextFunction) => {
          const name: string = req.params['tenant'];
          const tenant: Tenants = await this.tenantService.findOne(name);
  
          if (!tenant) {
            throw new BadRequestException(
              'Database Connection Error',
              'This tenant does not exists',
            );
          }
  
          try {
            getConnection(tenant.name);
            next();
          } catch (e) {
            await this.connection.query(
              `CREATE DATABASE IF NOT EXISTS ${tenant.name}`,
            );
  
            const createdConnection: Connection = await createConnection({
              name: tenant.name,
              type: 'mysql',
              host: this.configService.get('DB_HOST'),
              port: +this.configService.get('DB_PORT'),
              username: this.configService.get('DB_USER'),
              password: this.configService.get('DB_PASSWORD'),
              database: tenant.name,
              entities: [Users],
              ssl: true,
              synchronize: true,
            });
  
            if (createdConnection) {
              next();
            } else {
              throw new BadRequestException(
                'Database Connection Error',
                'There is a Error with the Database!',
              );
            }
          }
        })
        .exclude({ path: '/api/v1/tenants', method: RequestMethod.ALL })
        .forRoutes('*');
    }
  }

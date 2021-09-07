import { Module } from '@nestjs/common';
import { TenancyModule } from '../tenants/tenants.module';
import { UserController } from './users.controllers';
import { UserService } from './users.services';

@Module({
  imports: [TenancyModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UsersModule {}
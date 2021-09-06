import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    ],
  providers: [],
  controllers: [],
  exports: []
})
export class UsersModule {}
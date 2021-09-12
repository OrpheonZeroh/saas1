import { Inject, Injectable, Scope } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Connection, Repository } from 'typeorm';

import { TENANT_CONNECTION } from '../../public/tenants/tenants.provider';
import { CreateUserDto, ReadUserDto } from './users.cache';
import { Users } from './users.entity';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  private readonly userRepository: Repository<Users>;

  constructor(@Inject(TENANT_CONNECTION) connection: Connection) {
    this.userRepository = connection.getRepository(Users);
  }

  async findAll(): Promise<ReadUserDto[]> {
    const users = await this.userRepository.find();

    return users.map(user => plainToClass(ReadUserDto, user));
  }

  async create(user: CreateUserDto): Promise<ReadUserDto> {
    const createdUser = await this.userRepository.save(user);

    return plainToClass(ReadUserDto, createdUser);
  }
}
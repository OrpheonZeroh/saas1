import { Body, Controller, Get, Post } from '@nestjs/common';

import { UserService } from './users.services';
import { CreateUserDto, ReadUserDto } from './users.cache';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<ReadUserDto[]> {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() user: CreateUserDto): Promise<ReadUserDto> {
    return this.userService.create(user);
  }
}
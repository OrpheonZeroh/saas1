import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class CreateUserDto {
  @IsString()
  @Expose()
  readonly name: string;
}

@Exclude()
export class ReadUserDto {
  @IsNumber()
  @Expose()
  readonly id: string;

  @IsNumber()
  @Expose()
  readonly name: string;
}

export enum UserRole {
    ADMIN = 'admin',
    DOCTOR = 'doctor',    
    STAFF = 'staff',
    USER = 'users'
}
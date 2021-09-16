import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';


@Exclude()
export class ReadTenantDto {
  @IsNumber()
  @Expose()
  readonly id: string;

  @IsString()
  @Expose()
  readonly name: string;

  @IsString()
  @Expose()
  readonly status: boolean;
}


export class CreateTenantDto {

  @IsString()
  readonly id?: string;

  @IsString()
  readonly name?: string;
}

export class UpdateTenantDto {

  @IsString()
  readonly id: string;

}
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
}


export class CreateTenantDto {
  @IsString()
  readonly name?: string;
}

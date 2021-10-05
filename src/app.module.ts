import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './configs/data.access';
import { UsersModule } from './modules/private/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {

  static port : number;

  constructor(private readonly configService: ConfigService){
    AppModule.port = this.configService.get('APP_PORT')
  }
}

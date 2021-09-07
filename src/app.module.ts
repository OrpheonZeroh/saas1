import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './configs/data.access';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  static port : number;

  constructor(private readonly configService: ConfigService){
    AppModule.port = this.configService.get('APP_PORT')
  }
}

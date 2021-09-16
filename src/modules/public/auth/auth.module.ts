import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthRepository } from "./auth.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([])
    ],
    controllers: [],
    providers: []
})
export class AuthModule {}
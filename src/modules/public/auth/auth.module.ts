import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthRepository } from "./auth.repository";
import { TenancyModule } from "../tenants/tenants.module";

@Module({
    imports: [TenancyModule],
    controllers: [],
    providers: []
})
export class AuthModule {}
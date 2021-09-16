import { EntityRepository, Repository } from "typeorm";
import { Tenants } from "../tenants/tenants.entity";

@EntityRepository(Tenants)
export class AuthRepository extends Repository<Tenants> {
    
}
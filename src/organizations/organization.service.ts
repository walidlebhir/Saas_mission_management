import {InjectRepository} from "@nestjs/typeorm";
import {Organization} from "./Entity/organization.entity.js";
import {Repository} from "typeorm";
import {User} from "../users/Entity/user.entity.js";


export class  OrganizationService{

    constructor(
        @InjectRepository(Organization)
        private readonly  Organizationrepository : Repository<Organization>,
        @InjectRepository(User)
        private readonly  UserRepository : Repository<User>
    ) {}


    /**
     *create and config new company
     *
     */


    async  CreateNewConfig(){

    }
}
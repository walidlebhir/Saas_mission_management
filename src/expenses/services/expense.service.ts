import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Expense} from "../Entity/expense.entity.js";
import {Repository} from "typeorm";
import {User} from "../../users/Entity/user.entity.js";


/**
 * creation d'une dependance
 *
 */

@Injectable()
export class  ExpenseService{

    constructor(
        @InjectRepository(Expense)
        private  readonly  ExpenseRepository : Repository<Expense> ,
        @InjectRepository(User)
        private readonly  UserRepository : Repository<User> ,

    ) {}







}
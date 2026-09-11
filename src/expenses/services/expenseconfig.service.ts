
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ExpenseCategoryLimit} from "../Entity/expense-category-limit.entity.js";
import {Repository} from "typeorm";
import {Mission} from "../../missions/Entity/mission.entity.js";
import {Expenseconfigrequest} from "../Dto/expenseconfigrequest.js";
import {
    InternalServerErrorException,
    NotFoundException,
    ResourceExistsException,
} from "../../common/exception/index.js";


/**
 * creation d'une configuration des dependance
 *
 */

@Injectable()
export  class ExpenseconfigService{

    constructor(
        @InjectRepository(ExpenseCategoryLimit)
        private readonly  ExpenseCategoryLimitRepository : Repository<ExpenseCategoryLimit> ,
        @InjectRepository(Mission)
        private readonly  MissionRepository : Repository<Mission>
    ) {}


    async  CreateNewOCnfigurationExpense(dataRequestconfig : Expenseconfigrequest) {

        try{
            const mission = await this.MissionRepository.findBy({
                id : dataRequestconfig.mission_id
            });
            if(!mission ){
                throw  new ResourceExistsException("mission dont existe ")
            }
            let ExpenseConfig = this.ExpenseCategoryLimitRepository.create({
                missionId : dataRequestconfig.mission_id ,
                category:dataRequestconfig.category ,
                dailyLimit:dataRequestconfig.dailyLimit,
                perExpenseLimit:dataRequestconfig.perExpenseLimit,
                requiresReceiptAbove:dataRequestconfig.requiresReceiptAbove
            });
            await this.ExpenseCategoryLimitRepository.save(ExpenseConfig);
            return {
                "response" : "config create with success "
            }

        }catch(error){
            throw  new InternalServerErrorException("problemme dans le serveur ");

        }

    }


    async GetExpenseConfigByMissionId(missionId: string) {

        try {
            const mission = await this.MissionRepository.findOne({
                where: { id: missionId },
            });
            if (!mission) {
                throw new NotFoundException("mission n'existe pas ");
            }

            const configs = await this.ExpenseCategoryLimitRepository.findBy({
                missionId,
            });

            if (configs.length === 0) {
                throw new NotFoundException("aucune configuration trouve pour cette mission ");
            }

            return configs;

        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException("probleme dans le serveur ");
        }

    }


}
import {HttpException, Injectable, InternalServerErrorException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Mission} from "./Entity/mission.entity.js";
import {Repository} from "typeorm";
import {Organization} from "../organizations/Entity/organization.entity.js";
import {MissionRequest} from "./Dto/MissionRequest.js";
import {MissionStatus} from "./Entity/enum/MissionStatus.js";
import {ExpenseCategory} from "../expenses/Entity/enum/ExpenseCategory.js";
import {NotFoundException} from "../common/exception/index.js";
import {User} from "../users/Entity/user.entity.js";
import {SafeUser} from "../users/user.service.js";


@Injectable()
export  class MissionService{

    constructor(
        @InjectRepository(Mission)
        private  readonly  MissionRepository : Repository<Mission>,
        @InjectRepository(Organization)
        private  readonly  OrganisationRepository : Repository<Organization>,
        @InjectRepository(User)
        private readonly UserRepository : Repository<User>

    ) {
    }


    /**
     * creation d'une mission
     * assigner mission a un user
     * update mission
     * anuller mission
     * consultataion mission
     */

    async  CreateNewMission(
            datamissionrequest : MissionRequest ,
            userconecter : SafeUser
    ): Promise<Mission>{
        try{

            // verification organization existe
            const organizationRequest = await this.OrganisationRepository.findOneBy({
                id: datamissionrequest.id_organization,
            });

            if(!organizationRequest){
                throw new NotFoundException("L'organisation n'existe pas") ;
            }

            const craetedBy = await  this.UserRepository.findOneBy({
                id: userconecter.id
            });
            if(!craetedBy){
                throw new NotFoundException('Utilisateur introuvable') ;
            }

            const newMissionCreate = this.MissionRepository.create({
                organizationId : datamissionrequest.id_organization ,
                createdBy : craetedBy.id ,
                name : datamissionrequest.name ,
                description : datamissionrequest.description ,
                destination : datamissionrequest.destination ,
                startDate : datamissionrequest.startdate ,
                endDate : datamissionrequest.enddate ,
                budget : datamissionrequest.budget ,
                currency : datamissionrequest.currency ,
                status : datamissionrequest.status ,
            });

            return await this.MissionRepository.save(newMissionCreate) ;

        }catch(error ){
            if (error instanceof HttpException) {
                throw error;
            }
            const message =
                error instanceof Error ? error.message : 'Unknown error';
            throw  new InternalServerErrorException(
                "Erreur lors de la création de la mission",
                message,
            ) ;

        }
    }

    async SHowMission(){

    }

    async  UpdateMission(){

    }

    async assignMissionUser(){

    }




    /**
     * retourne la liste des statuts possibles d'une mission
     */
    getMissionStatuses(): MissionStatus[] {
        return Object.values(MissionStatus);
    }

    /**
     * retourne la liste des catégories de dépenses possibles
     */
    getExpenseCategories(): ExpenseCategory[] {
        return Object.values(ExpenseCategory);
    }




}
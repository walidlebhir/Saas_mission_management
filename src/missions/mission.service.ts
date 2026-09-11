import {HttpException, Injectable, InternalServerErrorException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Mission} from "./Entity/mission.entity.js";
import {Repository} from "typeorm";
import {Organization} from "../organizations/Entity/organization.entity.js";
import {MissionRequest} from "./Dto/MissionRequest.js";
import {UpdateMissionRequest} from "./Dto/UpdateMissionRequest.js";
import {AssignMissionRequest} from "./Dto/AssignMissionRequest.js";
import {MissionStatus} from "./Entity/enum/MissionStatus.js";
import {ExpenseCategory} from "../expenses/Entity/enum/ExpenseCategory.js";
import {NotFoundException} from "../common/exception/index.js";
import {User} from "../users/Entity/user.entity.js";
import {SafeUser} from "../users/user.service.js";
import {MissionAssignment} from "./Entity/mission-assignment.entity.js";
import type {MissionResponse} from "./Dto/MissionResponse.js";


@Injectable()
export  class MissionService{

    constructor(
        @InjectRepository(Mission)
        private  readonly  MissionRepository : Repository<Mission>,
        @InjectRepository(Organization)
        private  readonly  OrganisationRepository : Repository<Organization>,
        @InjectRepository(User)
        private readonly UserRepository : Repository<User>,
        @InjectRepository(MissionAssignment)
        private readonly MissionAssignmentRepository : Repository<MissionAssignment>,

    ) {
    }


    private toMissionResponse(mission: Mission): MissionResponse {
        return {
            id: mission.id,
            organizationId: mission.organizationId,
            createdBy: mission.createdBy,
            name: mission.name,
            description: mission.description,
            destination: mission.destination,
            startDate: mission.startDate,
            endDate: mission.endDate,
            budget: mission.budget,
            currency: mission.currency,
            status: mission.status,
            advanceAmount: mission.advanceAmount,
            createdAt: mission.createdAt,
            updatedAt: mission.updatedAt,
        };
    }

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

    async ShowMission(missionId: string): Promise<MissionResponse> {
        try {
            const mission = await this.MissionRepository.findOne({
                where: { id: missionId },
                relations: { creator: true, organization: true },
            });

            if (!mission) {
                throw new NotFoundException("La mission n'existe pas");
            }

            return this.toMissionResponse(mission);

        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            const message =
                error instanceof Error ? error.message : 'Unknown error';
            throw new InternalServerErrorException(
                "Erreur lors de la récupération de la mission",
                message,
            );
        }
    }

    async UpdateMission(
        missionId: string,
        dataMissionUpdate: UpdateMissionRequest,
        userconect: SafeUser,
    ): Promise<MissionResponse> {
        try {
            const mission = await this.MissionRepository.findOneBy({
                id: missionId,
            });

            if (!mission) {
                throw new NotFoundException("La mission n'existe pas");
            }

            if (mission.createdBy !== userconect.id) {
                throw new NotFoundException(
                    "Vous n'avez pas le droit de modifier cette mission",
                );
            }

            if (dataMissionUpdate.name !== undefined) {
                mission.name = dataMissionUpdate.name;
            }
            if (dataMissionUpdate.description !== undefined) {
                mission.description = dataMissionUpdate.description;
            }
            if (dataMissionUpdate.destination !== undefined) {
                mission.destination = dataMissionUpdate.destination;
            }
            if (dataMissionUpdate.startdate !== undefined) {
                mission.startDate = dataMissionUpdate.startdate as any;
            }
            if (dataMissionUpdate.enddate !== undefined) {
                mission.endDate = dataMissionUpdate.enddate as any;
            }
            if (dataMissionUpdate.budget !== undefined) {
                mission.budget = dataMissionUpdate.budget;
            }
            if (dataMissionUpdate.currency !== undefined) {
                mission.currency = dataMissionUpdate.currency;
            }
            if (dataMissionUpdate.status !== undefined) {
                mission.status = dataMissionUpdate.status;
            }

            const saved = await this.MissionRepository.save(mission);
            return this.toMissionResponse(saved);

        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            const message =
                error instanceof Error ? error.message : 'Unknown error';
            throw new InternalServerErrorException(
                "Erreur lors de la mise à jour de la mission",
                message,
            );
        }
    }

    async assignMissionUser(
        missionId: string,
        dto: AssignMissionRequest,
        userconect: SafeUser,
    ): Promise<MissionAssignment> {
        try {
            const mission = await this.MissionRepository.findOneBy({
                id: missionId,
            });

            if (!mission) {
                throw new NotFoundException("La mission n'existe pas");
            }

            const userToAssign = await this.UserRepository.findOneBy({
                id: dto.userId,
            });

            if (!userToAssign) {
                throw new NotFoundException("L'utilisateur à assigner n'existe pas");
            }

            const existingAssignment = await this.MissionAssignmentRepository.findOne({
                where: { missionId, userId: dto.userId },
            });

            if (existingAssignment) {
                throw new NotFoundException(
                    "Cet utilisateur est déjà assigné à cette mission",
                );
            }

            const assignment = this.MissionAssignmentRepository.create({
                missionId,
                userId: dto.userId,
                assignedBy: userconect.id,
            });

            return await this.MissionAssignmentRepository.save(assignment);

        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            const message =
                error instanceof Error ? error.message : 'Unknown error';
            throw new InternalServerErrorException(
                "Erreur lors de l'assignation de la mission",
                message,
            );
        }
    }

    async deleteMission(missionId: string, userconect: SafeUser): Promise<void> {
        try {
            const mission = await this.MissionRepository.findOneBy({
                id: missionId,
            });

            if (!mission) {
                throw new NotFoundException("La mission n'existe pas");
            }

            if (mission.createdBy !== userconect.id) {
                throw new NotFoundException(
                    "Vous n'avez pas le droit de supprimer cette mission",
                );
            }

            await this.MissionRepository.remove(mission);

        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            const message =
                error instanceof Error ? error.message : 'Unknown error';
            throw new InternalServerErrorException(
                "Erreur lors de la suppression de la mission",
                message,
            );
        }
    }

    async listMissionsByOrganization(organizationId: string): Promise<MissionResponse[]> {
        try {
            const organization = await this.OrganisationRepository.findOneBy({
                id: organizationId,
            });

            if (!organization) {
                throw new NotFoundException("L'organisation n'existe pas");
            }

            const missions = await this.MissionRepository.find({
                where: { organizationId },
                order: { createdAt: 'DESC' },
            });

            return missions.map((m) => this.toMissionResponse(m));

        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            const message =
                error instanceof Error ? error.message : 'Unknown error';
            throw new InternalServerErrorException(
                "Erreur lors de la récupération des missions",
                message,
            );
        }
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
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './Entity/organization.entity.js';
import { User } from '../users/Entity/user.entity.js';
import { OrganizationRequest } from './Dto/OrganizationRequest.js';
import { SafeUser } from '../users/user.service.js';
import { Role } from '../users/Entity/enum/Role.js';
import {
    ForbiddenException,
    NotFoundException,
    DuplicateEntryException,
    InternalServerErrorException, ResourceExistsException,
} from '../common/exception/index.js';
import {OrganizationResponse} from "./Dto/OrganizationResponse.js";

export interface CreateOrganizationResult {
  id: string;
  name: string;
  slug: string;
  plan: string;
  organizationCreatorId: string;
}



@Injectable()
export class OrganizationService {
    constructor(
      @InjectRepository(Organization)
      private readonly OrganizationRepository: Repository<Organization>,
      @InjectRepository(User)
      private readonly UserRepository: Repository<User>,
    ) {}

    /**
     * Create and configure a new organization.
     * Only users with the "finance" role are allowed to create/configure an organization.
     */


    async CreateNewOrganization(
      DataOrganizationRequest: OrganizationRequest,
      userConnected: SafeUser,

    ): Promise<CreateOrganizationResult> {


      if (userConnected.role !== Role.Finance) {
        throw new ForbiddenException(
          'Seul un utilisateur de rôle "finance" peut créer une organisation',
        );
      }

      return this.withErrorBoundary('Erreur lors de la création de l\'organisation', async () => {
        const existingSlug = await this.OrganizationRepository.findOne({
          where: { slug: DataOrganizationRequest.slug },
        });
        if (existingSlug !== null) {
          throw new DuplicateEntryException(
            `Le slug "${DataOrganizationRequest.slug}" est déjà utilisé`,
          );
        }

        const NewOrganization = this.OrganizationRepository.create({
          name: DataOrganizationRequest.name,
          slug: DataOrganizationRequest.slug,
          domain: DataOrganizationRequest.domain,
          logoUrl: DataOrganizationRequest.logoUrl,
          isActive: DataOrganizationRequest.isActive,
          plan: DataOrganizationRequest.plan,
          maxEmployees: DataOrganizationRequest.maxEmploye,
          settings: DataOrganizationRequest.setting,
        });

        const SavedOrganization = await this.OrganizationRepository.save(
          NewOrganization,
        );

        const user = await this.UserRepository.findOne({
          where: { email: userConnected.email },
        });
        if (user === null) {
          throw new NotFoundException('Utilisateur introuvable');
        }

        user.organizationId = SavedOrganization.id;
        await this.UserRepository.save(user);

        return {
          id: SavedOrganization.id,
          name: SavedOrganization.name,
          slug: SavedOrganization.slug,
          plan: SavedOrganization.plan,
          organizationCreatorId: user.id,
        };


      });
    }

    private async withErrorBoundary<T>(
      message: string,
      fn: () => Promise<T>,
    ): Promise<T> {
      try {
        return await fn();
      } catch (error) {
        if (error instanceof HttpException) {
          throw error;
        }
        const detail =
          error instanceof Error ? error.message : 'Unknown error';
        throw new InternalServerErrorException(message, detail);
      }
    }



  // recuperaion organization :

    async  ShowOrganization(organizationId : string )
        :Promise<OrganizationResponse>
    {
      try{
          const organization =await this.OrganizationRepository.findOneBy({
              id : organizationId
          });

          if(organization === null){
              throw  new ResourceExistsException("organization not existe ") ;

          }
          return {
            id : organization.id ,
            name:organization.name ,
            slug : organization.slug ,
            plan : organization.plan ,
            domain : organization.domain ,
            maxEmployees : organization.maxEmployees ,
            currency : organization.currency,
            isActive : organization.isActive,
            settings : organization.settings ,
          }


      }catch(error ){
          if(error instanceof  HttpException ){
              throw  error ;
          }

          throw new InternalServerErrorException("problemme dans le serveur ")
      }

    }

    // modefication parametre d'organization :
    async  updateOrganization(
        idorganization : string ,
        datarequestorganization : OrganizationRequest,
        userconect : SafeUser
        ): Promise<OrganizationResponse>{

      if (userconect.role !== Role.Finance) {
        throw new ForbiddenException(
          'Seul un utilisateur de rôle "finance" peut modifier une organisation',
        );
      }

      return this.withErrorBoundary('Erreur lors de la modification de l\'organisation', async () => {
        const organizationupdate = await this.OrganizationRepository.findOneBy({
          id: idorganization,
        });
        if (organizationupdate === null) {
          throw new NotFoundException("L'organisation n'existe pas");
        }

        if (datarequestorganization.slug !== organizationupdate.slug) {
          const existingSlug = await this.OrganizationRepository.findOne({
            where: { slug: datarequestorganization.slug },
          });
          if (existingSlug !== null) {
            throw new DuplicateEntryException(
              `Le slug "${datarequestorganization.slug}" est déjà utilisé`,
            );
          }
        }

        // modefiecation des donnes :
        organizationupdate.name = datarequestorganization.name;
        organizationupdate.slug = datarequestorganization.slug;
        if (datarequestorganization.domain !== undefined) {
          organizationupdate.domain = datarequestorganization.domain;
        }
        if (datarequestorganization.logoUrl !== undefined) {
          organizationupdate.logoUrl = datarequestorganization.logoUrl;
        }
        organizationupdate.plan = datarequestorganization.plan;
        if (datarequestorganization.maxEmploye !== undefined) {
          organizationupdate.maxEmployees = datarequestorganization.maxEmploye;
        }
        if (datarequestorganization.setting !== undefined) {
          organizationupdate.settings = datarequestorganization.setting;
        }
        if (datarequestorganization.isActive !== undefined) {
          organizationupdate.isActive = datarequestorganization.isActive;
        }

        const saved = await this.OrganizationRepository.save(organizationupdate);

        return {
          id: saved.id,
          name: saved.name,
          slug: saved.slug,
          plan: saved.plan,
          domain: saved.domain,
          maxEmployees: saved.maxEmployees,
          currency: saved.currency,
          isActive: saved.isActive,
          settings: saved.settings,
        };
      });


    }






}
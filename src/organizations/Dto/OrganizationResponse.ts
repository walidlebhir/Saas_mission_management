import {Plan} from "../Entity/enum/Plan.js";


export  interface OrganizationResponse{
    id : string ;
    name  : string ;
    slug : string ;
    domain : string ;
    plan : Plan ;
    maxEmployees : number ;
    currency : string ;
    settings : Record<string, unknown> ;
    isActive : boolean

}
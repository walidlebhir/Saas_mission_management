import {MissionStatus} from "../Entity/enum/MissionStatus.js";


export  class MissionRequest{
    id_organization : string ;
    name : string ;
    description : string ;
    destination : string ;
    startdate : Date ;
    enddate : Date ;
    budget : number ;
    currency : string ;
    status : MissionStatus ;

}
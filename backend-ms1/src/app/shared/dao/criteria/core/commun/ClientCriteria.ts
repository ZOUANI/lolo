import {BaseCriteria} from "src/app/zynerator/criteria/BaseCriteria";



export class ClientCriteria extends  BaseCriteria  {

    public cin: string;
    public cinLike: string;
    public nom: string;
    public nomLike: string;
    public tel: string;
    public telLike: string;
    public email: string;
    public emailLike: string;
    public adresse: string;
    public adresseLike: string;
    public creance: string;
    public creanceMin: string;
    public creanceMax: string;


    public constructor(){
        super();
    }
}

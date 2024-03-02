import {BaseCriteria} from "src/app/zynerator/criteria/BaseCriteria";



export class ActionPermissionCriteria extends  BaseCriteria  {

    public reference: string;
    public referenceLike: string;
    public libelle: string;
    public libelleLike: string;


    public constructor(){
        super();
    }
}

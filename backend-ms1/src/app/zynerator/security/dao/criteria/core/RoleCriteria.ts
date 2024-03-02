import {BaseCriteria} from "src/app/zynerator/criteria/BaseCriteria";



export class RoleCriteria extends  BaseCriteria  {

    public authority: string;
    public authorityLike: string;


    public constructor(){
        super();
    }
}

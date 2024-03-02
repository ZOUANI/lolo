import {BaseCriteria} from "src/app/zynerator/criteria/BaseCriteria";

import {ClientCriteria} from "src/app/shared/dao/criteria/core/commun/ClientCriteria";


export class AchatCriteria extends  BaseCriteria  {

    public reference: string;
    public referenceLike: string;
    public dateAchat: Date;
    public dateAchatFrom: Date;
    public dateAchatTo: Date;
    public total: string;
    public totalMin: string;
    public totalMax: string;
    public totalPaye: string;
    public totalPayeMin: string;
    public totalPayeMax: string;

    public client: ClientCriteria;
    public clients: Array<ClientCriteria>;

    public constructor(){
        super();
    }
}

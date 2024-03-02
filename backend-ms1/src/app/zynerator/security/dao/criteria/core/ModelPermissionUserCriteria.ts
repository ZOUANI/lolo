import {BaseCriteria} from "src/app/zynerator/criteria/BaseCriteria";
import {ActionPermissionCriteria} from "src/app/zynerator/security/dao/criteria/core/ActionPermissionCriteria";
import {ModelPermissionCriteria} from "src/app/zynerator/security/dao/criteria/core/ModelPermissionCriteria";
import {UserCriteria} from "src/app/zynerator/security/dao/criteria/core/UserCriteria";



export class ModelPermissionUserCriteria extends  BaseCriteria  {

    public value: boolean ;
    public subAttribute: string;
    public subAttributeLike: string;

    public actionPermission: ActionPermissionCriteria;
    public actionPermissions: Array<ActionPermissionCriteria>;
    public modelPermission: ModelPermissionCriteria;
    public modelPermissions: Array<ModelPermissionCriteria>;
    public user: UserCriteria;
    public users: Array<UserCriteria>;

    public constructor(){
        super();
    }
}

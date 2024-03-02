import {BaseCriteria} from "src/app/zynerator/criteria/BaseCriteria";
import {UserCriteria} from "src/app/zynerator/security/dao/criteria/core/UserCriteria";
import {RoleCriteria} from "src/app/zynerator/security/dao/criteria/core/RoleCriteria";


export class RoleUserCriteria extends  BaseCriteria  {


    public user: UserCriteria;
    public users: Array<UserCriteria>;
    public role: RoleCriteria;
    public roles: Array<RoleCriteria>;

    public constructor(){
        super();
    }
}

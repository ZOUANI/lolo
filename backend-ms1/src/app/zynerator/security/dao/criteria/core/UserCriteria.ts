import {BaseCriteria} from "src/app/zynerator/criteria/BaseCriteria";



export class UserCriteria extends  BaseCriteria  {

    public credentialsNonExpired: boolean ;
    public enabled: boolean ;
    public email: string;
    public emailLike: string;
    public accountNonExpired: boolean ;
    public accountNonLocked: boolean ;
    public username: string;
    public usernameLike: string;
    public password: string;
    public passwordLike: string;
    public passwordChanged: boolean ;
    public lastName: string;
    public lastNameLike: string;
    public firstName: string;
    public firstNameLike: string;
    public phone: string;
    public phoneLike: string;


    public constructor(){
        super();
    }
}

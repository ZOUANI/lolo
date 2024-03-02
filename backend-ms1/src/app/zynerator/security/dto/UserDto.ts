import {RoleUserDto} from "src/app/zynerator/security/dto/RoleUserDto";
import {ModelPermissionUserDto} from "src/app/zynerator/security/dto/ModelPermissionUserDto";

export class UserDto {
    public id: number;
    public credentialsNonExpired: boolean;
    public enabled: boolean;
    public email: string;
    public accountNonExpired: boolean;
    public accountNonLocked: boolean;
    public username: string;
    public password: string;
    public passwordChanged: boolean;
    public lastName: string;
    public firstName: string;
    public phone: string;

    public roleUsers: RoleUserDto[];
    public modelPermissionUsers: ModelPermissionUserDto[];

    constructor(id?: number, username?: string) {
        this.id = id;
        this.username = username;
    }



}

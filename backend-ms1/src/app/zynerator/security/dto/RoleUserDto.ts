import {UserDto} from "src/app/zynerator/security/dto/UserDto";
import {RoleDto} from "src/app/zynerator/security/dto/RoleDto";

export class RoleUserDto {
    public id: number;

    public user: UserDto;
    public role: RoleDto;

    constructor(id?: number) {
        this.id = id;
    }



}

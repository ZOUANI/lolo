import {ActionPermissionDto} from "src/app/zynerator/security/dto/ActionPermissionDto";
import {ModelPermissionDto} from "src/app/zynerator/security/dto/ModelPermissionDto";
import {UserDto} from "src/app/zynerator/security/dto/UserDto";

export class ModelPermissionUserDto {
    public id: number;
    public value: boolean;
    public subAttribute: string;

    public actionPermission: ActionPermissionDto;
    public modelPermission: ModelPermissionDto;
    public user: UserDto;

    constructor(id?: number) {
        this.id = id;
    }



}

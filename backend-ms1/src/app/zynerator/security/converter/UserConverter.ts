import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {AbstractConverter} from "src/app/zynerator/converter/AbstractConverter";
import {RoleConverter} from "src/app/zynerator/security/converter/RoleConverter";
import {User} from "src/app/zynerator/security/bean/core/User";
import {UserDto} from "src/app/zynerator/security/dto/UserDto";
import {ModelPermissionUserConverter} from "src/app/zynerator/security/converter/ModelPermissionUserConverter";
import {ModelPermissionConverter} from "src/app/zynerator/security/converter/ModelPermissionConverter";
import {RoleUserConverter} from "src/app/zynerator/security/converter/RoleUserConverter";
import {ActionPermissionConverter} from "src/app/zynerator/security/converter/ActionPermissionConverter";


@Injectable()
export class UserConverter extends AbstractConverter<User, UserDto> {

    roleUsers: boolean;
    modelPermissionUsers: boolean;

    constructor(
        @Inject(forwardRef(() => RoleConverter)) readonly roleConverter: RoleConverter,
        @Inject(forwardRef(() => ModelPermissionUserConverter)) readonly modelPermissionUserConverter: ModelPermissionUserConverter,
        @Inject(forwardRef(() => ModelPermissionConverter)) readonly modelPermissionConverter: ModelPermissionConverter,
        @Inject(forwardRef(() => RoleUserConverter)) readonly roleUserConverter: RoleUserConverter,
        @Inject(forwardRef(() => ActionPermissionConverter)) readonly actionPermissionConverter: ActionPermissionConverter,
        ) {
            super();
            this.init(true);
    }

    toItem(dto: UserDto): User {
        if (!dto) {
            return null;
        }
        const item =new User();
        if (dto.id) {
            item.id = dto.id;
        }
        if (dto.credentialsNonExpired) {
            item.credentialsNonExpired = dto.credentialsNonExpired;
        }
        if (dto.enabled) {
            item.enabled = dto.enabled;
        }
        if (dto.email) {
            item.email = dto.email;
        }
        if (dto.accountNonExpired) {
            item.accountNonExpired = dto.accountNonExpired;
        }
        if (dto.accountNonLocked) {
            item.accountNonLocked = dto.accountNonLocked;
        }
        if (dto.username) {
            item.username = dto.username;
        }
        if (dto.password) {
            item.password = dto.password;
        }
        if (dto.passwordChanged) {
            item.passwordChanged = dto.passwordChanged;
        }
        if (dto.lastName) {
            item.lastName = dto.lastName;
        }
        if (dto.firstName) {
            item.firstName = dto.firstName;
        }
        if (dto.phone) {
            item.phone = dto.phone;
        }



		if(this.roleUsers && dto.roleUsers)
			item.roleUsers = this.roleUserConverter.toItems(dto.roleUsers);
		if(this.modelPermissionUsers && dto.modelPermissionUsers)
			item.modelPermissionUsers = this.modelPermissionUserConverter.toItems(dto.modelPermissionUsers);

        return item;
    }

    toDto(item: User): UserDto {
        if (!item) {
            return null;
        }
        const dto = new UserDto();

        if (item.id) {
            dto.id = item.id;
        }
        if (item.credentialsNonExpired) {
            dto.credentialsNonExpired = item.credentialsNonExpired;
        }
        if (item.enabled) {
            dto.enabled = item.enabled;
        }
        if (item.email) {
            dto.email = item.email;
        }
        if (item.accountNonExpired) {
            dto.accountNonExpired = item.accountNonExpired;
        }
        if (item.accountNonLocked) {
            dto.accountNonLocked = item.accountNonLocked;
        }
        if (item.username) {
            dto.username = item.username;
        }
        if (item.password) {
            dto.password = item.password;
        }
        if (item.passwordChanged) {
            dto.passwordChanged = item.passwordChanged;
        }
        if (item.lastName) {
            dto.lastName = item.lastName;
        }
        if (item.firstName) {
            dto.firstName = item.firstName;
        }
        if (item.phone) {
            dto.phone = item.phone;
        }

        if(this.roleUsers && item.roleUsers?.length > 0){
            this.roleUserConverter.init(true);
            this.roleUserConverter.user = false;
            dto.roleUsers = this.roleUserConverter.toDtos(item.roleUsers);
            this.roleUserConverter.user = true;
        }
        if(this.modelPermissionUsers && item.modelPermissionUsers?.length > 0){
            this.modelPermissionUserConverter.init(true);
            this.modelPermissionUserConverter.user = false;
            dto.modelPermissionUsers = this.modelPermissionUserConverter.toDtos(item.modelPermissionUsers);
            this.modelPermissionUserConverter.user = true;
        }

        return dto;
    }


    public initList(value: boolean): void {
            this.roleUsers = value;
            this.modelPermissionUsers = value;
    }

    public initObject(value: boolean): void {
    }
}

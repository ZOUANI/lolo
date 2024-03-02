import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {AbstractConverter} from "src/app/zynerator/converter/AbstractConverter";
import {Role} from "src/app/zynerator/security/bean/core/Role";
import {RoleDto} from "src/app/zynerator/security/dto/RoleDto";




@Injectable()
export class RoleConverter extends AbstractConverter<Role, RoleDto> {


    constructor(
        ) {
            super();
            this.init(true);
    }

    toItem(dto: RoleDto): Role {
        if (!dto) {
            return null;
        }
        const item =new Role();
        if (dto.id) {
            item.id = dto.id;
        }
        if (dto.authority) {
            item.authority = dto.authority;
        }




        return item;
    }

    toDto(item: Role): RoleDto {
        if (!item) {
            return null;
        }
        const dto = new RoleDto();

        if (item.id) {
            dto.id = item.id;
        }
        if (item.authority) {
            dto.authority = item.authority;
        }


        return dto;
    }



    public initObject(value: boolean): void {
    }
}

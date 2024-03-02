import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {AbstractConverter} from "src/app/zynerator/converter/AbstractConverter";

import {ActionPermission} from "src/app/zynerator/security/bean/core/ActionPermission";
import {ActionPermissionDto} from "src/app/zynerator/security/dto/ActionPermissionDto";


@Injectable()
export class ActionPermissionConverter extends AbstractConverter<ActionPermission, ActionPermissionDto> {


    constructor(
        ) {
            super();
            this.init(true);
    }

    toItem(dto: ActionPermissionDto): ActionPermission {
        if (!dto) {
            return null;
        }
        const item =new ActionPermission();
        if (dto.id) {
            item.id = dto.id;
        }
        if (dto.reference) {
            item.reference = dto.reference;
        }
        if (dto.libelle) {
            item.libelle = dto.libelle;
        }




        return item;
    }

    toDto(item: ActionPermission): ActionPermissionDto {
        if (!item) {
            return null;
        }
        const dto = new ActionPermissionDto();

        if (item.id) {
            dto.id = item.id;
        }
        if (item.reference) {
            dto.reference = item.reference;
        }
        if (item.libelle) {
            dto.libelle = item.libelle;
        }


        return dto;
    }



    public initObject(value: boolean): void {
    }
}

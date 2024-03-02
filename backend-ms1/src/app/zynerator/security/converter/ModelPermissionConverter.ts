import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {AbstractConverter} from "src/app/zynerator/converter/AbstractConverter";
import {ModelPermission} from "src/app/zynerator/security/bean/core/ModelPermission";
import {ModelPermissionDto} from "src/app/zynerator/security/dto/ModelPermissionDto";


@Injectable()
export class ModelPermissionConverter extends AbstractConverter<ModelPermission, ModelPermissionDto> {


    constructor(
        ) {
            super();
            this.init(true);
    }

    toItem(dto: ModelPermissionDto): ModelPermission {
        if (!dto) {
            return null;
        }
        const item =new ModelPermission();
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

    toDto(item: ModelPermission): ModelPermissionDto {
        if (!item) {
            return null;
        }
        const dto = new ModelPermissionDto();

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

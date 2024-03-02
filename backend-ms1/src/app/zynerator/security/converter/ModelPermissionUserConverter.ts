import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {AbstractConverter} from "src/app/zynerator/converter/AbstractConverter";
import {ModelPermissionUser} from "src/app/zynerator/security/bean/core/ModelPermissionUser";
import {ModelPermissionUserDto} from "src/app/zynerator/security/dto/ModelPermissionUserDto";
import {UserConverter} from "src/app/zynerator/security/converter/UserConverter";
import {ModelPermissionConverter} from "src/app/zynerator/security/converter/ModelPermissionConverter";
import {ActionPermissionConverter} from "src/app/zynerator/security/converter/ActionPermissionConverter";
import {User} from "src/app/zynerator/security/bean/core/User";



@Injectable()
export class ModelPermissionUserConverter extends AbstractConverter<ModelPermissionUser, ModelPermissionUserDto> {

    actionPermission: boolean;
    modelPermission: boolean;
    user: boolean;

    constructor(
        @Inject(forwardRef(() => UserConverter)) readonly userConverter: UserConverter,
        @Inject(forwardRef(() => ModelPermissionConverter)) readonly modelPermissionConverter: ModelPermissionConverter,
        @Inject(forwardRef(() => ActionPermissionConverter)) readonly actionPermissionConverter: ActionPermissionConverter,
        ) {
            super();
            this.init(true);
    }

    toItem(dto: ModelPermissionUserDto): ModelPermissionUser {
        if (!dto) {
            return null;
        }
        const item =new ModelPermissionUser();
        if (dto.id) {
            item.id = dto.id;
        }
        if (dto.value) {
            item.value = dto.value;
        }
        if (dto.subAttribute) {
            item.subAttribute = dto.subAttribute;
        }


		if(this.actionPermission && dto.actionPermission &&  dto.actionPermission.id)
			item.actionPermission = this.actionPermissionConverter.toItem(dto.actionPermission) ;

		if(this.modelPermission && dto.modelPermission &&  dto.modelPermission.id)
			item.modelPermission = this.modelPermissionConverter.toItem(dto.modelPermission) ;

		if(dto.user && dto.user.id){
			item.user = new User();
			item.user.id = dto.user.id;
			item.user.username =  dto.user.username;
		}



        return item;
    }

    toDto(item: ModelPermissionUser): ModelPermissionUserDto {
        if (!item) {
            return null;
        }
        const dto = new ModelPermissionUserDto();

        if (item.id) {
            dto.id = item.id;
        }
        if (item.value) {
            dto.value = item.value;
        }
        if (item.subAttribute) {
            dto.subAttribute = item.subAttribute;
        }
        if(this.actionPermission && item.actionPermission)
            dto.actionPermission = this.actionPermissionConverter.toDto(item.actionPermission) ;
        if(this.modelPermission && item.modelPermission)
            dto.modelPermission = this.modelPermissionConverter.toDto(item.modelPermission) ;
        if(this.user && item.user)
            dto.user = this.userConverter.toDto(item.user) ;


        return dto;
    }



    public initObject(value: boolean): void {
        this.actionPermission = value;
        this.modelPermission = value;
        this.user = value;
    }
}

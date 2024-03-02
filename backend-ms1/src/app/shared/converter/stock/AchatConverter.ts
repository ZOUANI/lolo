import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {AbstractConverter} from "src/app/zynerator/converter/AbstractConverter";

import {Achat} from "src/app/shared/bean/core/stock/Achat";
import {AchatDto} from "src/app/shared/dto/stock/AchatDto";

import {AchatItemConverter} from "src/app/shared/converter/stock/AchatItemConverter";
import {ClientConverter} from "src/app/shared/converter/commun/ClientConverter";
import {ProduitConverter} from "src/app/shared/converter/commun/ProduitConverter";

@Injectable()
export class AchatConverter extends AbstractConverter<Achat, AchatDto> {

    client: boolean;
    achatItems: boolean;

    constructor(
        @Inject(forwardRef(() => AchatItemConverter)) readonly achatItemConverter: AchatItemConverter,
        @Inject(forwardRef(() => ClientConverter)) readonly clientConverter: ClientConverter,
        @Inject(forwardRef(() => ProduitConverter)) readonly produitConverter: ProduitConverter,
        ) {
            super();
            this.init(true);
    }

    toItem(dto: AchatDto): Achat {
        if (!dto) {
            return null;
        }
        const item =new Achat();
        if (dto.id) {
            item.id = dto.id;
        }
        if (dto.reference) {
            item.reference = dto.reference;
        }
        if (dto.dateAchat) {
            item.dateAchat = dto.dateAchat;
        }
        if (dto.total) {
            item.total = dto.total;
        }
        if (dto.totalPaye) {
            item.totalPaye = dto.totalPaye;
        }
        if (dto.description) {
            item.description = dto.description;
        }


		if(this.client && dto.client &&  dto.client.id)
			item.client = this.clientConverter.toItem(dto.client) ;


		if(this.achatItems && dto.achatItems)
			item.achatItems = this.achatItemConverter.toItems(dto.achatItems);

        return item;
    }

    toDto(item: Achat): AchatDto {
        if (!item) {
            return null;
        }
        const dto = new AchatDto();

        if (item.id) {
            dto.id = item.id;
        }
        if (item.reference) {
            dto.reference = item.reference;
        }
        if (item.dateAchat) {
            dto.dateAchat = item.dateAchat;
        }
        if (item.total) {
            dto.total = item.total;
        }
        if (item.totalPaye) {
            dto.totalPaye = item.totalPaye;
        }
        if (item.description) {
            dto.description = item.description;
        }
        if(this.client && item.client)
            dto.client = this.clientConverter.toDto(item.client) ;

        if(this.achatItems && item.achatItems?.length > 0){
            this.achatItemConverter.init(true);
            this.achatItemConverter.achat = false;
            dto.achatItems = this.achatItemConverter.toDtos(item.achatItems);
            this.achatItemConverter.achat = true;
        }

        return dto;
    }


    public initList(value: boolean): void {
            this.achatItems = value;
    }

    public initObject(value: boolean): void {
        this.client = value;
    }
}

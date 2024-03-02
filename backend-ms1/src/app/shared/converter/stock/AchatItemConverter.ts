import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {AbstractConverter} from "src/app/zynerator/converter/AbstractConverter";

import {AchatItem} from "src/app/shared/bean/core/stock/AchatItem";
import {AchatItemDto} from "src/app/shared/dto/stock/AchatItemDto";

import {AchatConverter} from "src/app/shared/converter/stock/AchatConverter";
import {ProduitConverter} from "src/app/shared/converter/commun/ProduitConverter";
import {Achat} from "src/app/shared/bean/core/stock/Achat";

@Injectable()
export class AchatItemConverter extends AbstractConverter<AchatItem, AchatItemDto> {

    produit: boolean;
    achat: boolean;

    constructor(
        @Inject(forwardRef(() => AchatConverter)) readonly achatConverter: AchatConverter,
        @Inject(forwardRef(() => ProduitConverter)) readonly produitConverter: ProduitConverter,
        ) {
            super();
            this.init(true);
    }

    toItem(dto: AchatItemDto): AchatItem {
        if (!dto) {
            return null;
        }
        const item =new AchatItem();
        if (dto.id) {
            item.id = dto.id;
        }
        if (dto.prixUnitaire) {
            item.prixUnitaire = dto.prixUnitaire;
        }
        if (dto.prixVente) {
            item.prixVente = dto.prixVente;
        }
        if (dto.quantite) {
            item.quantite = dto.quantite;
        }
        if (dto.quantiteAvoir) {
            item.quantiteAvoir = dto.quantiteAvoir;
        }
        if (dto.remise) {
            item.remise = dto.remise;
        }


		if(this.produit && dto.produit &&  dto.produit.id)
			item.produit = this.produitConverter.toItem(dto.produit) ;

		if(dto.achat && dto.achat.id){
			item.achat = new Achat();
			item.achat.id = dto.achat.id;
			item.achat.reference =  dto.achat.reference;
		}



        return item;
    }

    toDto(item: AchatItem): AchatItemDto {
        if (!item) {
            return null;
        }
        const dto = new AchatItemDto();

        if (item.id) {
            dto.id = item.id;
        }
        if (item.prixUnitaire) {
            dto.prixUnitaire = item.prixUnitaire;
        }
        if (item.prixVente) {
            dto.prixVente = item.prixVente;
        }
        if (item.quantite) {
            dto.quantite = item.quantite;
        }
        if (item.quantiteAvoir) {
            dto.quantiteAvoir = item.quantiteAvoir;
        }
        if (item.remise) {
            dto.remise = item.remise;
        }
        if(this.produit && item.produit)
            dto.produit = this.produitConverter.toDto(item.produit) ;
        if(this.achat && item.achat)
            dto.achat = this.achatConverter.toDto(item.achat) ;


        return dto;
    }



    public initObject(value: boolean): void {
        this.produit = value;
        this.achat = value;
    }
}

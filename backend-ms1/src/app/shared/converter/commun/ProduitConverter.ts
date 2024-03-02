import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {AbstractConverter} from "src/app/zynerator/converter/AbstractConverter";

import {Produit} from "src/app/shared/bean/core/commun/Produit";
import {ProduitDto} from "src/app/shared/dto/commun/ProduitDto";


@Injectable()
export class ProduitConverter extends AbstractConverter<Produit, ProduitDto> {


    constructor(
        ) {
            super();
            this.init(true);
    }

    toItem(dto: ProduitDto): Produit {
        if (!dto) {
            return null;
        }
        const item =new Produit();
        if (dto.id) {
            item.id = dto.id;
        }
        if (dto.reference) {
            item.reference = dto.reference;
        }
        if (dto.libelle) {
            item.libelle = dto.libelle;
        }
        if (dto.barcode) {
            item.barcode = dto.barcode;
        }
        if (dto.discription) {
            item.discription = dto.discription;
        }
        if (dto.prixAchatMoyen) {
            item.prixAchatMoyen = dto.prixAchatMoyen;
        }
        if (dto.quantite) {
            item.quantite = dto.quantite;
        }
        if (dto.seuilAlert) {
            item.seuilAlert = dto.seuilAlert;
        }




        return item;
    }

    toDto(item: Produit): ProduitDto {
        if (!item) {
            return null;
        }
        const dto = new ProduitDto();

        if (item.id) {
            dto.id = item.id;
        }
        if (item.reference) {
            dto.reference = item.reference;
        }
        if (item.libelle) {
            dto.libelle = item.libelle;
        }
        if (item.barcode) {
            dto.barcode = item.barcode;
        }
        if (item.discription) {
            dto.discription = item.discription;
        }
        if (item.prixAchatMoyen) {
            dto.prixAchatMoyen = item.prixAchatMoyen;
        }
        if (item.quantite) {
            dto.quantite = item.quantite;
        }
        if (item.seuilAlert) {
            dto.seuilAlert = item.seuilAlert;
        }


        return dto;
    }



    public initObject(value: boolean): void {
    }
}

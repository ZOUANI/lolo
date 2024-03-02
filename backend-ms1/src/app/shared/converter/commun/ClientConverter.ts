import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {AbstractConverter} from "src/app/zynerator/converter/AbstractConverter";

import {Client} from "src/app/shared/bean/core/commun/Client";
import {ClientDto} from "src/app/shared/dto/commun/ClientDto";


@Injectable()
export class ClientConverter extends AbstractConverter<Client, ClientDto> {


    constructor(
        ) {
            super();
            this.init(true);
    }

    toItem(dto: ClientDto): Client {
        if (!dto) {
            return null;
        }
        const item =new Client();
        if (dto.id) {
            item.id = dto.id;
        }
        if (dto.cin) {
            item.cin = dto.cin;
        }
        if (dto.nom) {
            item.nom = dto.nom;
        }
        if (dto.tel) {
            item.tel = dto.tel;
        }
        if (dto.email) {
            item.email = dto.email;
        }
        if (dto.adresse) {
            item.adresse = dto.adresse;
        }
        if (dto.description) {
            item.description = dto.description;
        }
        if (dto.creance) {
            item.creance = dto.creance;
        }




        return item;
    }

    toDto(item: Client): ClientDto {
        if (!item) {
            return null;
        }
        const dto = new ClientDto();

        if (item.id) {
            dto.id = item.id;
        }
        if (item.cin) {
            dto.cin = item.cin;
        }
        if (item.nom) {
            dto.nom = item.nom;
        }
        if (item.tel) {
            dto.tel = item.tel;
        }
        if (item.email) {
            dto.email = item.email;
        }
        if (item.adresse) {
            dto.adresse = item.adresse;
        }
        if (item.description) {
            dto.description = item.description;
        }
        if (item.creance) {
            dto.creance = item.creance;
        }


        return dto;
    }



    public initObject(value: boolean): void {
    }
}

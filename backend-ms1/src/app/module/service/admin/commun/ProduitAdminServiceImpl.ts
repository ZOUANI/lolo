import {Injectable, NotFoundException} from "@nestjs/common";

import {AbstractServiceImpl} from "src/app/zynerator/service/AbstractServiceImpl";

import {ProduitDao} from "src/app/shared/dao/facade/core/commun/ProduitDao";
import {ProduitCriteria} from "src/app/shared/dao/criteria/core/commun/ProduitCriteria";
import {Produit} from "src/app/shared/bean/core/commun/Produit";
import {ProduitDto} from "src/app/shared/dto/commun/ProduitDto";


@Injectable()
export class ProduitAdminServiceImpl extends AbstractServiceImpl<Produit, ProduitCriteria, ProduitDao>{

    constructor(private readonly dao: ProduitDao ,
    ) {
        super(dao);
    }

    async save(item: Produit): Promise<Produit> {
        const saved = await this.dao.save(item);
        return saved;
    }


    async update(item: Produit): Promise<Produit> {
        const saved = await this.dao.saveOrUpdate(item);
        return saved;
    }

    async updateMultiple(items: Produit[]): Promise<void> {
        if (items) {
            items.forEach(e => this.update(e))
        }
    }

    async  findAllOptimized(): Promise<ProduitDto[]> {
        return this.dao.findAllOptimized();
    }

    async findAll(): Promise<Produit[]> {
        return this.dao.findAll();
    }

    async findById(id: number): Promise<Produit> {
        return this.dao.findById(id);
    }


    async deleteById(id: number): Promise<number> {
        const existing = await this.findById(id);
        if (!existing) {
            throw new NotFoundException(`Produit with ID ${id} not found.`);
        }
        const result = await this.dao.deleteById(existing.id);
        return result;
    }

    async deleteMultiple(items: Produit[]): Promise<Produit[]> {
        const deletedItems: Produit[] = [];
        for (const item of items) {
            await this.deleteById(item.id);
            deletedItems.push(item);
        }
        return deletedItems;
    }


    async findWithAssociatedLists(id: number): Promise<Produit> {
        const result = await this.dao.findById(id);
    return result;
    }

    async updateWithAssociatedLists(item: Produit): Promise<Produit> {
         return await this.dao.saveOrUpdate(item);
    }
}


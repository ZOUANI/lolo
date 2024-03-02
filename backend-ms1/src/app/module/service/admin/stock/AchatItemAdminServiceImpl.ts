import {Injectable, NotFoundException} from "@nestjs/common";

import {AbstractServiceImpl} from "src/app/zynerator/service/AbstractServiceImpl";

import {AchatItemDao} from "src/app/shared/dao/facade/core/stock/AchatItemDao";
import {AchatItemCriteria} from "src/app/shared/dao/criteria/core/stock/AchatItemCriteria";
import {AchatItem} from "src/app/shared/bean/core/stock/AchatItem";
import {AchatItemDto} from "src/app/shared/dto/stock/AchatItemDto";


@Injectable()
export class AchatItemAdminServiceImpl extends AbstractServiceImpl<AchatItem, AchatItemCriteria, AchatItemDao>{

    constructor(private readonly dao: AchatItemDao ,
    ) {
        super(dao);
    }

    async save(item: AchatItem): Promise<AchatItem> {
        const saved = await this.dao.save(item);
        return saved;
    }


    async update(item: AchatItem): Promise<AchatItem> {
        const saved = await this.dao.saveOrUpdate(item);
        return saved;
    }

    async updateMultiple(items: AchatItem[]): Promise<void> {
        if (items) {
            items.forEach(e => this.update(e))
        }
    }

    async  findAllOptimized(): Promise<AchatItemDto[]> {
        return this.dao.findAllOptimized();
    }

    async findAll(): Promise<AchatItem[]> {
        return this.dao.findAll();
    }

    async findById(id: number): Promise<AchatItem> {
        return this.dao.findById(id);
    }


    async deleteById(id: number): Promise<number> {
        const existing = await this.findById(id);
        if (!existing) {
            throw new NotFoundException(`Achat item with ID ${id} not found.`);
        }
        const result = await this.dao.deleteById(existing.id);
        return result;
    }

    async deleteMultiple(items: AchatItem[]): Promise<AchatItem[]> {
        const deletedItems: AchatItem[] = [];
        for (const item of items) {
            await this.deleteById(item.id);
            deletedItems.push(item);
        }
        return deletedItems;
    }

    async findByProduitId(id: number): Promise<AchatItem[]> {
        return this.dao.findByProduitId(id);
    }

    async deleteByProduitId(id: number): Promise<number> {
        return this.dao.deleteByProduitId(id);
    }
    async findByAchatId(id: number): Promise<AchatItem[]> {
        return this.dao.findByAchatId(id);
    }

    async deleteByAchatId(id: number): Promise<number> {
        return this.dao.deleteByAchatId(id);
    }

    async findWithAssociatedLists(id: number): Promise<AchatItem> {
        const result = await this.dao.findById(id);
    return result;
    }

    async updateWithAssociatedLists(item: AchatItem): Promise<AchatItem> {
         return await this.dao.saveOrUpdate(item);
    }
}


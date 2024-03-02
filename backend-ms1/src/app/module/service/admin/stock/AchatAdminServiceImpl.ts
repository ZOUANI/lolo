import {Injectable, NotFoundException} from "@nestjs/common";

import {AbstractServiceImpl} from "src/app/zynerator/service/AbstractServiceImpl";

import {AchatDao} from "src/app/shared/dao/facade/core/stock/AchatDao";
import {AchatCriteria} from "src/app/shared/dao/criteria/core/stock/AchatCriteria";
import {Achat} from "src/app/shared/bean/core/stock/Achat";
import {AchatDto} from "src/app/shared/dto/stock/AchatDto";

import {AchatItemAdminServiceImpl} from "src/app/module/service/admin/stock/AchatItemAdminServiceImpl";
import {AchatItem} from "src/app/shared/bean/core/stock/AchatItem";

@Injectable()
export class AchatAdminServiceImpl extends AbstractServiceImpl<Achat, AchatCriteria, AchatDao>{

    constructor(private readonly dao: AchatDao ,
                 private readonly achatItemService: AchatItemAdminServiceImpl ,
    ) {
        super(dao);
    }

    async save(item: Achat): Promise<Achat> {
        const saved = await this.dao.save(item);
        if (item.achatItems) {
            const savedAchatItems: AchatItem[] = [];
            for (const achatItem of item.achatItems) {
                achatItem.achat = saved;
                const savedAchatItem = await this.achatItemService.save(achatItem);
                savedAchatItems.push(savedAchatItem);
            }
            saved.achatItems = savedAchatItems;
        }
        return saved;
    }


    async update(item: Achat): Promise<Achat> {
        const saved = await this.dao.saveOrUpdate(item);
        return saved;
    }

    async updateMultiple(items: Achat[]): Promise<void> {
        if (items) {
            items.forEach(e => this.update(e))
        }
    }

    async  findAllOptimized(): Promise<AchatDto[]> {
        return this.dao.findAllOptimized();
    }

    async findAll(): Promise<Achat[]> {
        return this.dao.findAll();
    }

    async findById(id: number): Promise<Achat> {
        return this.dao.findById(id);
    }


    async deleteById(id: number): Promise<number> {
        const existing = await this.findById(id);
        if (!existing) {
            throw new NotFoundException(`Achat with ID ${id} not found.`);
        }
       await this.achatItemService.deleteByAchatId(id)
        const result = await this.dao.deleteById(existing.id);
        return result;
    }

    async deleteMultiple(items: Achat[]): Promise<Achat[]> {
        const deletedItems: Achat[] = [];
        for (const item of items) {
            await this.deleteById(item.id);
            deletedItems.push(item);
        }
        return deletedItems;
    }

    async findByClientId(id: number): Promise<Achat[]> {
        return this.dao.findByClientId(id);
    }

    async deleteByClientId(id: number): Promise<number> {
        return this.dao.deleteByClientId(id);
    }

    async findWithAssociatedLists(id: number): Promise<Achat> {
        const result = await this.dao.findById(id);
        if (result && result.id) {
          result.achatItems = await this.achatItemService.findByAchatId(result.id);
        }
    return result;
    }

    async updateWithAssociatedLists(item: Achat): Promise<Achat> {
            if (item && item.id) {
                //update  achatItems
                const oldAchatItems = await this.achatItemService.findByAchatId(item.id);
                const achatItemsResult = this.achatItemService.getToBeSavedAndToBeDeleted(oldAchatItems, item.achatItems);
                if (achatItemsResult && achatItemsResult.length === 2) {
                    await this.achatItemService.deleteMultiple(achatItemsResult[1]);
                    (achatItemsResult[0] || []).forEach((e) => e.achat = item);
                    await this.achatItemService.updateMultiple(achatItemsResult[0]);
                }

                return this.update(item);
        }
    }
}


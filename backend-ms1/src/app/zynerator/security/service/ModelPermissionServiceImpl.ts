import {Injectable, NotFoundException} from "@nestjs/common";

import {AbstractServiceImpl} from "src/app/zynerator/service/AbstractServiceImpl";
import {ModelPermissionDao} from "src/app/zynerator/security/dao/facade/core/ModelPermissionDao";
import {ModelPermission} from "src/app/zynerator/security/bean/core/ModelPermission";
import {ModelPermissionCriteria} from "src/app/zynerator/security/dao/criteria/core/ModelPermissionCriteria";


@Injectable()
export class ModelPermissionServiceImpl extends AbstractServiceImpl<ModelPermission, ModelPermissionCriteria, ModelPermissionDao>{

    constructor(private readonly dao: ModelPermissionDao ,
    ) {
        super(dao);
    }

    async save(item: ModelPermission): Promise<ModelPermission> {
        const saved = await this.dao.save(item);
        return saved;
    }


    async update(item: ModelPermission): Promise<ModelPermission> {
        const saved = await this.dao.saveOrUpdate(item);
        return saved;
    }

    async updateMultiple(items: ModelPermission[]): Promise<void> {
        if (items) {
            items.forEach(e => this.update(e))
        }
    }

    async  findAllOptimized(): Promise<ModelPermission[]> {
        return this.dao.findAllOptimized();
    }

    async findAll(): Promise<ModelPermission[]> {
        return this.dao.findAll();
    }

    async findById(id: number): Promise<ModelPermission> {
        return this.dao.findById(id);
    }


    async deleteById(id: number): Promise<number> {
        const existing = await this.findById(id);
        if (!existing) {
            throw new NotFoundException(`Model permission with ID ${id} not found.`);
        }
        const result = await this.dao.deleteById(existing.id);
        return result;
    }

    async deleteMultiple(items: ModelPermission[]): Promise<ModelPermission[]> {
        const deletedItems: ModelPermission[] = [];
        for (const item of items) {
            await this.deleteById(item.id);
            deletedItems.push(item);
        }
        return deletedItems;
    }


    async findWithAssociatedLists(id: number): Promise<ModelPermission> {
        const result = await this.dao.findById(id);
    return result;
    }

    async updateWithAssociatedLists(item: ModelPermission): Promise<ModelPermission> {
         return await this.dao.saveOrUpdate(item);
    }
}


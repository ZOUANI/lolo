import {Injectable, NotFoundException, OnApplicationBootstrap} from "@nestjs/common";

import {AbstractServiceImpl} from "src/app/zynerator/service/AbstractServiceImpl";
import {ActionPermissionDao} from "src/app/zynerator/security/dao/facade/core/ActionPermissionDao";
import {ActionPermission} from "src/app/zynerator/security/bean/core/ActionPermission";
import {ActionPermissionCriteria} from "src/app/zynerator/security/dao/criteria/core/ActionPermissionCriteria";


@Injectable()
export class ActionPermissionServiceImpl extends AbstractServiceImpl<ActionPermission, ActionPermissionCriteria, ActionPermissionDao> implements OnApplicationBootstrap{

    constructor(private readonly dao: ActionPermissionDao ,
    ) {
        super(dao);
    }

    async save(item: ActionPermission): Promise<ActionPermission> {
        const saved = await this.dao.save(item);
        return saved;
    }


    async update(item: ActionPermission): Promise<ActionPermission> {
        const saved = await this.dao.saveOrUpdate(item);
        return saved;
    }

    async updateMultiple(items: ActionPermission[]): Promise<void> {
        if (items) {
            items.forEach(e => this.update(e))
        }
    }

    async  findAllOptimized(): Promise<ActionPermission[]> {
        return this.dao.findAllOptimized();
    }

    async findAll(): Promise<ActionPermission[]> {
        return this.dao.findAll();
    }

    async findById(id: number): Promise<ActionPermission> {
        return this.dao.findById(id);
    }


    async deleteById(id: number): Promise<number> {
        const existing = await this.findById(id);
        if (!existing) {
            throw new NotFoundException(`Action permission with ID ${id} not found.`);
        }
        const result = await this.dao.deleteById(existing.id);
        return result;
    }

    async deleteMultiple(items: ActionPermission[]): Promise<ActionPermission[]> {
        const deletedItems: ActionPermission[] = [];
        for (const item of items) {
            await this.deleteById(item.id);
            deletedItems.push(item);
        }
        return deletedItems;
    }


    async findOrSave(actionPermission: ActionPermission ): Promise<ActionPermission> {
    return this.dao.findOrSave(actionPermission);
    }
    async findWithAssociatedLists(id: number): Promise<ActionPermission> {
        const result = await this.dao.findById(id);
    return result;
    }

    async updateWithAssociatedLists(item: ActionPermission): Promise<ActionPermission> {
         return await this.dao.saveOrUpdate(item);
    }
    async onApplicationBootstrap() {
        await this.initAction(new Array<ActionPermission>());
    }
    async initAction(actionPermissions : Array<ActionPermission>){
        actionPermissions.push(new ActionPermission(  null,'list'));
        actionPermissions.push(new ActionPermission(  null,'edit'));
        actionPermissions.push(new ActionPermission(  null,'delete'));
        actionPermissions.push(new ActionPermission( null,'update'));
        actionPermissions.push(new ActionPermission(  null,'create'));
        actionPermissions.push(new ActionPermission(  null,'duplicate'));
        actionPermissions.push(new ActionPermission( null,'view'));

        for (const actionPermission of actionPermissions) {

            await this.dao.findOrSave(actionPermission);
        }



    }
}


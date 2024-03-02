import {Injectable, NotFoundException} from "@nestjs/common";

import {AbstractServiceImpl} from "src/app/zynerator/service/AbstractServiceImpl";
import {RoleDao} from "src/app/zynerator/security/dao/facade/core/RoleDao";
import {Role} from "src/app/zynerator/security/bean/core/Role";
import {RoleCriteria} from "src/app/zynerator/security/dao/criteria/core/RoleCriteria";
import {RoleDto} from "src/app/zynerator/security/dto/RoleDto";




@Injectable()
export class RoleServiceImpl extends AbstractServiceImpl<Role, RoleCriteria, RoleDao>{

    constructor(private readonly dao: RoleDao ,
    ) {
        super(dao);
    }

    async save(item: Role): Promise<Role> {
        const saved = await this.dao.save(item);
        return saved;
    }


    async update(item: Role): Promise<Role> {
        const saved = await this.dao.saveOrUpdate(item);
        return saved;
    }

    async updateMultiple(items: Role[]): Promise<void> {
        if (items) {
            items.forEach(e => this.update(e))
        }
    }

    async  findAllOptimized(): Promise<RoleDto[]> {
        return this.dao.findAllOptimized();
    }
    async findOrSave(item: Role): Promise<Role> {
        if (item) {
            const role = await this.dao.findByAuthority(item.authority);
            if (role == null) {
                const rolePromise = await this.save(item);
                return rolePromise;
            }
            return role;
        }
        return null;
    }
    async findAll(): Promise<Role[]> {
        return this.dao.findAll();
    }

    async findById(id: number): Promise<Role> {
        return this.dao.findById(id);
    }


    async deleteById(id: number): Promise<number> {
        const existing = await this.findById(id);
        if (!existing) {
            throw new NotFoundException(`Role with ID ${id} not found.`);
        }
        const result = await this.dao.deleteById(existing.id);
        return result;
    }

    async deleteMultiple(items: Role[]): Promise<Role[]> {
        const deletedItems: Role[] = [];
        for (const item of items) {
            await this.deleteById(item.id);
            deletedItems.push(item);
        }
        return deletedItems;
    }


    async findWithAssociatedLists(id: number): Promise<Role> {
        const result = await this.dao.findById(id);
    return result;
    }
    async findByAuthority(authority: string): Promise<Role> {
        return this.dao.findByAuthority(authority);
    }

    async updateWithAssociatedLists(item: Role): Promise<Role> {
         return await this.dao.saveOrUpdate(item);
    }
}


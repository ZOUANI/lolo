import {Injectable, NotFoundException} from "@nestjs/common";

import {AbstractServiceImpl} from "src/app/zynerator/service/AbstractServiceImpl";
import {RoleUserDao} from "src/app/zynerator/security/dao/facade/core/RoleUserDao";
import {RoleUser} from "src/app/zynerator/security/bean/core/RoleUser";
import {RoleUserCriteria} from "src/app/zynerator/security/dao/criteria/core/RoleUserCriteria";
import {RoleUserDto} from "src/app/zynerator/security/dto/RoleUserDto";
import {RoleServiceImpl} from "src/app/zynerator/security/service/RoleServiceImpl";




@Injectable()
export class RoleUserServiceImpl extends AbstractServiceImpl<RoleUser, RoleUserCriteria, RoleUserDao>{

    constructor(private readonly dao: RoleUserDao ,
                    private readonly roleService: RoleServiceImpl,
    ) {
        super(dao);
    }

    async save(item: RoleUser): Promise<RoleUser> {
        const role = await this.roleService.findOrSave(item.role);
        item.role = role;
        const saved = await this.dao.save(item);
        return saved;
    }


    async update(item: RoleUser): Promise<RoleUser> {
        const saved = await this.dao.saveOrUpdate(item);
        return saved;
    }

    async updateMultiple(items: RoleUser[]): Promise<void> {
        if (items) {
            items.forEach(e => this.update(e))
        }
    }

    async  findAllOptimized(): Promise<RoleUserDto[]> {
        return this.dao.findAllOptimized();
    }

    async findAll(): Promise<RoleUser[]> {
        return this.dao.findAll();
    }

    async findById(id: number): Promise<RoleUser> {
        return this.dao.findById(id);
    }


    async deleteById(id: number): Promise<number> {
        const existing = await this.findById(id);
        if (!existing) {
            throw new NotFoundException(`Role user with ID ${id} not found.`);
        }
        const result = await this.dao.deleteById(existing.id);
        return result;
    }

    async deleteMultiple(items: RoleUser[]): Promise<RoleUser[]> {
        const deletedItems: RoleUser[] = [];
        for (const item of items) {
            await this.deleteById(item.id);
            deletedItems.push(item);
        }
        return deletedItems;
    }

    async findByUserId(id: number): Promise<RoleUser[]> {
        return this.dao.findByUserId(id);
    }

    async deleteByUserId(id: number): Promise<number> {
        return this.dao.deleteByUserId(id);
    }
    async findByRoleId(id: number): Promise<RoleUser[]> {
        return this.dao.findByRoleId(id);
    }

    async deleteByRoleId(id: number): Promise<number> {
        return this.dao.deleteByRoleId(id);
    }

    async findWithAssociatedLists(id: number): Promise<RoleUser> {
        const result = await this.dao.findById(id);
    return result;
    }

    async updateWithAssociatedLists(item: RoleUser): Promise<RoleUser> {
         return await this.dao.saveOrUpdate(item);
    }
}


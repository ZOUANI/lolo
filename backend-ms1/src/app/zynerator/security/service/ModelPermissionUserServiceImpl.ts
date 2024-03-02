import {Injectable, NotFoundException} from "@nestjs/common";

import {AbstractServiceImpl} from "src/app/zynerator/service/AbstractServiceImpl";

import {ModelPermissionUserDao} from "src/app/zynerator/security/dao/facade/core/ModelPermissionUserDao";
import {ModelPermissionUserCriteria} from "src/app/zynerator/security/dao/criteria/core/ModelPermissionUserCriteria";
import {ModelPermissionUser} from "src/app/zynerator/security/bean/core/ModelPermissionUser";
import {ModelPermissionUserDto} from "src/app/zynerator/security/dto/ModelPermissionUserDto";
import {ModelPermissionServiceImpl} from "src/app/zynerator/security/service/ModelPermissionServiceImpl";
import {ActionPermissionServiceImpl} from "src/app/zynerator/security/service/ActionPermissionServiceImpl";


@Injectable()
export class ModelPermissionUserServiceImpl extends AbstractServiceImpl<ModelPermissionUser, ModelPermissionUserCriteria, ModelPermissionUserDao> {

    constructor(private readonly dao: ModelPermissionUserDao,
                private readonly modelPermissionService: ModelPermissionServiceImpl,
                private readonly actionPermissionService: ActionPermissionServiceImpl
    ) {
        super(dao);
    }

    async save(item: ModelPermissionUser): Promise<ModelPermissionUser> {
        const saved = await this.dao.save(item);
        return saved;
    }


    async findModelPermissionUser(): Promise<ModelPermissionUser[]> {
        const modelPermissionUsers: ModelPermissionUser[] = [];

        const models = await this.modelPermissionService.findAllOptimized();

        const actions = await this.actionPermissionService.findAllOptimized();

        for (const model of models) {
            for (const action of actions) {
                const permissionUser = new ModelPermissionUser();
                permissionUser.modelPermission = model;
                permissionUser.actionPermission = action;
                permissionUser.value = true;
                modelPermissionUsers.push(permissionUser);
            }

        }

        return modelPermissionUsers;
    }

    async initModelPermissionUser(): Promise<ModelPermissionUser[]> {
        const modelPermissionUsers: ModelPermissionUser[] = [];
        for (const modelPermissionUser of await this.findModelPermissionUser()) {
            const result = await this.checkModelPermissionUser(modelPermissionUser);
            if (result) {
                modelPermissionUsers.push(modelPermissionUser);
            }
        }

        return modelPermissionUsers;
    }
    async initSecurityModelPermissionUser(): Promise<ModelPermissionUser[]> {
        const modelPermissionUsers: ModelPermissionUser[] = [];
        for (const modelPermissionUser of await this.findModelPermissionUser()) {
            const result = await this.checkModelPermissionUser(modelPermissionUser);
            if (!result) {
                modelPermissionUsers.push(modelPermissionUser);
            }
        }

        return modelPermissionUsers;
    }

    //check if the model permission is User or ActionPermission OR ModelPermission je ne l'ajoute pas dans list envoyé par initModelPermissionUser
    async checkModelPermissionUser(modelPermissionUser: ModelPermissionUser): Promise<Boolean> {
        return !(modelPermissionUser.modelPermission.reference === "User" || modelPermissionUser.modelPermission.reference === "ActionPermission" || modelPermissionUser.modelPermission.reference === "ModelPermission");

    }

    async update(item: ModelPermissionUser): Promise<ModelPermissionUser> {
        const saved = await this.dao.saveOrUpdate(item);
        return saved;
    }

    async updateMultiple(items: ModelPermissionUser[]): Promise<void> {
        if (items) {
            items.forEach(e => this.update(e))
        }
    }

    async findAllOptimized(): Promise<ModelPermissionUserDto[]> {
        return this.dao.findAllOptimized();
    }

    async findAll(): Promise<ModelPermissionUser[]> {
        return this.dao.findAll();
    }

    async findById(id: number): Promise<ModelPermissionUser> {
        return this.dao.findById(id);
    }


    async deleteById(id: number): Promise<number> {
        const existing = await this.findById(id);
        if (!existing) {
            throw new NotFoundException(`Model permission user with ID ${id} not found.`);
        }
        const result = await this.dao.deleteById(existing.id);
        return result;
    }

    async deleteMultiple(items: ModelPermissionUser[]): Promise<ModelPermissionUser[]> {
        const deletedItems: ModelPermissionUser[] = [];
        for (const item of items) {
            await this.deleteById(item.id);
            deletedItems.push(item);
        }
        return deletedItems;
    }

    async findByActionPermissionId(id: number): Promise<ModelPermissionUser[]> {
        return this.dao.findByActionPermissionId(id);
    }

    async deleteByActionPermissionId(id: number): Promise<number> {
        return this.dao.deleteByActionPermissionId(id);
    }

    async findByModelPermissionId(id: number): Promise<ModelPermissionUser[]> {
        return this.dao.findByModelPermissionId(id);
    }

    async deleteByModelPermissionId(id: number): Promise<number> {
        return this.dao.deleteByModelPermissionId(id);
    }

    async findByUserId(id: number): Promise<ModelPermissionUser[]> {
        return this.dao.findByUserId(id);
    }

    async deleteByUserId(id: number): Promise<number> {
        return this.dao.deleteByUserId(id);
    }

    async findWithAssociatedLists(id: number): Promise<ModelPermissionUser> {
        const result = await this.dao.findById(id);
        return result;
    }

    async updateWithAssociatedLists(item: ModelPermissionUser): Promise<ModelPermissionUser> {
        return await this.dao.saveOrUpdate(item);
    }
}


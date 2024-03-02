import {BadRequestException, Injectable, NotFoundException, OnApplicationBootstrap} from "@nestjs/common";

import {AbstractServiceImpl} from "src/app/zynerator/service/AbstractServiceImpl";
import {ModelPermissionUser} from "src/app/zynerator/security/bean/core/ModelPermissionUser";
import {User} from "src/app/zynerator/security/bean/core/User";
import {UserCriteria} from "src/app/zynerator/security/dao/criteria/core/UserCriteria";
import {UserDao} from "src/app/zynerator/security/dao/facade/core/UserDao";
import {RoleUserServiceImpl} from "src/app/zynerator/security/service/RoleUserServiceImpl";
import {ModelPermissionUserServiceImpl} from "src/app/zynerator/security/service/ModelPermissionUserServiceImpl";
import {RoleUser} from "src/app/zynerator/security/bean/core/RoleUser";
import {UserDto} from "src/app/zynerator/security/dto/UserDto";
import {UserRequest} from "src/app/zynerator/security/dto/UserRequest";
import * as bcrypt from "bcrypt";
import {JwtService} from "@nestjs/jwt";
import {RoleServiceImpl} from "src/app/zynerator/security/service/RoleServiceImpl";
import {Role} from "src/app/zynerator/security/bean/core/Role";




@Injectable()
export class UserServiceImpl extends AbstractServiceImpl<User, UserCriteria, UserDao> implements OnApplicationBootstrap{

    constructor(private readonly dao: UserDao ,
                private readonly roleService: RoleServiceImpl ,
                 private readonly roleUserService: RoleUserServiceImpl ,
                 private readonly modelPermissionUserService: ModelPermissionUserServiceImpl ,
                private jwtService: JwtService,
    ) {
        super(dao);
    }

     async save(item: User): Promise<User> {
        if (item && item.password) {
            const user = await this.findByUsername(item.username);
            if (user) return null;
            let hashedPassword = await bcrypt.hash(item.password, 12);
            item.password = hashedPassword;
            const savedItem = await this.dao.save(item);
            if (item.roleUsers) {
                const savedRoleUsers: RoleUser[] = [];
                for (const roleUser of item.roleUsers) {
                    roleUser.user = savedItem;
                    const savedRoleUser = await this.roleUserService.save(roleUser);
                    savedRoleUsers.push(savedRoleUser);
                }
                savedItem.roleUsers = savedRoleUsers;
            }
            if (item.modelPermissionUsers) {
                const savedModelPermissionUsers: ModelPermissionUser[] = [];
                for (const modelPermissionUser of item.modelPermissionUsers) {
                    modelPermissionUser.user = savedItem;
                    const savedModelPermissionUser = await this.modelPermissionUserService.save(modelPermissionUser);
                    savedModelPermissionUsers.push(savedModelPermissionUser);
                }
                savedItem.modelPermissionUsers = savedModelPermissionUsers;
            }
            return savedItem;
        }
        return null;
     }

    async login(userRequest: UserRequest): Promise<any> {
        const loadedUser = await this.findByUsername(userRequest.username);
        if (!loadedUser) {
            throw new BadRequestException("Bad Credentials");
        } else {
            const hashedPasswordComparaison = await bcrypt.compare(userRequest.password, loadedUser.password);
            if (!hashedPasswordComparaison) {
                throw new BadRequestException("Bad Credentials");
            } else {


                const token = this.jwtService.sign({
                    id: loadedUser.id,
                    username: loadedUser.username,
                    email: loadedUser.email,
                    roles: loadedUser.roleUsers.map(e => e.role?.authority)
                });
                return {
                    id: loadedUser.id,
                    username: loadedUser.username,
                    email: loadedUser.email,
                    roles: loadedUser.roleUsers.map(e => e.role?.authority),
                    accessToken: token,
                    tokenType: 'Bearer'
                };
            }
        }
    }

    async update(item: User): Promise<User> {
        const saved = await this.dao.saveOrUpdate(item);
        return saved;
    }

    async updateMultiple(items: User[]): Promise<void> {
        if (items) {
            items.forEach(e => this.update(e))
        }
    }

    async  findAllOptimized(): Promise<UserDto[]> {
        return this.dao.findAllOptimized();
    }

    async findAll(): Promise<User[]> {
        return this.dao.findAll();
    }

    async findById(id: number): Promise<User> {
        return this.dao.findById(id);
    }
    async findByUsername(username: string): Promise<User> {
        var userPromise = await this.dao.findByUsername(username);
        if (userPromise && userPromise.id)
        userPromise = await this.findWithAssociatedLists(userPromise.id)
        return userPromise;
    }


    async deleteById(id: number): Promise<number> {
        const existing = await this.findById(id);
        if (!existing) {
            throw new NotFoundException(`User with ID ${id} not found.`);
        }
       await this.roleUserService.deleteByUserId(id)
       await this.modelPermissionUserService.deleteByUserId(id)
        const result = await this.dao.deleteById(existing.id);
        return result;
    }

    async deleteMultiple(items: User[]): Promise<User[]> {
        const deletedItems: User[] = [];
        for (const item of items) {
            await this.deleteById(item.id);
            deletedItems.push(item);
        }
        return deletedItems;
    }


    async findWithAssociatedLists(id: number): Promise<User> {
        const result = await this.dao.findById(id);
        if (result && result.id) {
          result.roleUsers = await this.roleUserService.findByUserId(result.id);
          result.modelPermissionUsers = await this.modelPermissionUserService.findByUserId(result.id);
        }
    return result;
    }

    async updateWithAssociatedLists(item: User): Promise<User> {
            if (item && item.id) {
                //update  roleUsers
                const oldRoleUsers = await this.roleUserService.findByUserId(item.id);
                const result = this.roleUserService.getToBeSavedAndToBeDeleted(oldRoleUsers, item.roleUsers);
                if (result && result.length === 2) {
                    await this.roleUserService.deleteMultiple(result[1]);
                    (result[0] || []).forEach((e) => e.user = item);
                    await this.roleUserService.updateMultiple(result[0]);
                }

                //update  modelPermissionUsers
                const oldModelPermissionUsers = await this.modelPermissionUserService.findByUserId(item.id);
                const result1 = this.modelPermissionUserService.getToBeSavedAndToBeDeleted(oldModelPermissionUsers, item.modelPermissionUsers);
                if (result1 && result1.length === 2) {
                    await this.modelPermissionUserService.deleteMultiple(result1[1]);
                    (result1[0] || []).forEach((e) => e.user = item);
                    await this.modelPermissionUserService.updateMultiple(result1[0]);
                }

                return this.update(item);
        }
    }
    async onApplicationBootstrap() {
         await this.createUserAdmin();
    }
    async createUserAdmin() {

        const userAdmin= new User();
        userAdmin.username="admin";
        userAdmin.password="123";
        userAdmin.email="email";
        userAdmin.firstName="admin";
        userAdmin.phone="123";
        userAdmin.lastName="admin";
        userAdmin.passwordChanged=false;
        userAdmin.enabled=true;
        userAdmin.accountNonExpired=true;
        userAdmin.accountNonLocked=true;
        userAdmin.credentialsNonExpired=true;
        var roleAdmin= new Role();
        roleAdmin.authority="ROLE_ADMIN";
        roleAdmin =await this.roleService.findOrSave(roleAdmin);
        var roleUser = new RoleUser();
        roleUser.role=roleAdmin;
        userAdmin.roleUsers=[roleUser];
        await this.save(userAdmin);

    }
}


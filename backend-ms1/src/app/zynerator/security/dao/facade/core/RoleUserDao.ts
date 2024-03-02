import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {AbstractRepository} from "src/app/zynerator/repository/AbstractRepository";
import {RoleUser} from "src/app/zynerator/security/bean/core/RoleUser";
import {RoleUserCriteria} from "src/app/zynerator/security/dao/criteria/core/RoleUserCriteria";
import {RoleUserDto} from "src/app/zynerator/security/dto/RoleUserDto";


@Injectable()
export class RoleUserDao extends AbstractRepository<RoleUser, RoleUserCriteria> {

    constructor(@InjectRepository(RoleUser) private readonly repository: Repository<RoleUser>,) {
        super(repository);
    }

    async save(item: RoleUser): Promise<RoleUser> {
        const savedItem = await this.repository.save(item);
        return savedItem;
    }


    async saveOrUpdate(item: RoleUser): Promise<RoleUser> {
        if (item.id) {
            const entity = await this.findById(item.id);
            if (!entity) {
                throw new Error('Entity not found');
            }
            Object.assign(entity, item);
            return this.repository.save(entity);
        } else {
            return this.repository.save(item);
        }
    }

    async  findAllOptimized(): Promise<RoleUserDto[]> {
        return this.repository
                    .createQueryBuilder('item')
                    .select(['item.id AS id'])
                    .getRawMany()
                    .then((result) => result.map((row) => new RoleUserDto(row.id)));


    }

    async  findAll(): Promise<RoleUser[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<RoleUser> {
        return this.repository.findOne({where: {id}});
    }


    async deleteById(id: number): Promise<number> {
        const result = await this.repository.delete({id});
        return result.affected;
    }

    async findByUserId(id: number): Promise<RoleUser[]> {
        return this.repository.find({where: {user: {id}}});
    }

    async deleteByUserId(id: number): Promise<number> {
        const result = await this.repository.delete({user: {id}});
        return result.affected;
    }
    async findByRoleId(id: number): Promise<RoleUser[]> {
        return this.repository.find({where: {role: {id}}});
    }

    async deleteByRoleId(id: number): Promise<number> {
        const result = await this.repository.delete({role: {id}});
        return result.affected;
    }


    public constructQuery(criteria: RoleUserCriteria): SelectQueryBuilder<RoleUser> {
        const query = this.initQuery(this.repository)
            .leftJoin('item.user', 'user')
            .leftJoin('item.role', 'role')
            .select(['item' , 'user', 'role'])

        if (criteria.user) {
            const user = criteria.user;
            this.addConstraint(query, user.id, 'user.id = :userId', {userId: user.id,});
            this.addConstraint(query, user.username, 'user.username = :userUsername', {userUsername: user.username,});
        }
        if (criteria.role) {
            const role = criteria.role;
            this.addConstraint(query, role.id, 'role.id = :roleId', {roleId: role.id,});
            this.addConstraint(query, role.authority, 'role.authority = :roleAuthority', {roleAuthority: role.authority,});
        }
        return query;
    }

}

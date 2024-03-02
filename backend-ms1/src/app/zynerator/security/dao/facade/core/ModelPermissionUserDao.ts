import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {AbstractRepository} from "src/app/zynerator/repository/AbstractRepository";
import {ModelPermissionUser} from "src/app/zynerator/security/bean/core/ModelPermissionUser";
import {ModelPermissionUserCriteria} from "src/app/zynerator/security/dao/criteria/core/ModelPermissionUserCriteria";
import {ModelPermissionUserDto} from "src/app/zynerator/security/dto/ModelPermissionUserDto";


@Injectable()
export class ModelPermissionUserDao extends AbstractRepository<ModelPermissionUser, ModelPermissionUserCriteria> {

    constructor(@InjectRepository(ModelPermissionUser) private readonly repository: Repository<ModelPermissionUser>,) {
        super(repository);
    }

    async save(item: ModelPermissionUser): Promise<ModelPermissionUser> {
        const savedItem = await this.repository.save(item);
        return savedItem;
    }


    async saveOrUpdate(item: ModelPermissionUser): Promise<ModelPermissionUser> {
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

    async  findAllOptimized(): Promise<ModelPermissionUserDto[]> {
        return this.repository
                    .createQueryBuilder('item')
                    .select(['item.id AS id'])
                    .getRawMany()
                    .then((result) => result.map((row) => new ModelPermissionUserDto(row.id)));


    }

    async  findAll(): Promise<ModelPermissionUser[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<ModelPermissionUser> {
        return this.repository.findOne({where: {id}});
    }


    async deleteById(id: number): Promise<number> {
        const result = await this.repository.delete({id});
        return result.affected;
    }

    async findByActionPermissionId(id: number): Promise<ModelPermissionUser[]> {
        return this.repository.find({where: {actionPermission: {id}}});
    }

    async deleteByActionPermissionId(id: number): Promise<number> {
        const result = await this.repository.delete({actionPermission: {id}});
        return result.affected;
    }
    async findByModelPermissionId(id: number): Promise<ModelPermissionUser[]> {
        return this.repository.find({where: {modelPermission: {id}}});
    }

    async deleteByModelPermissionId(id: number): Promise<number> {
        const result = await this.repository.delete({modelPermission: {id}});
        return result.affected;
    }
    async findByUserId(id: number): Promise<ModelPermissionUser[]> {
        return this.repository.find({where: {user: {id}}});
    }

    async deleteByUserId(id: number): Promise<number> {
        const result = await this.repository.delete({user: {id}});
        return result.affected;
    }


    public constructQuery(criteria: ModelPermissionUserCriteria): SelectQueryBuilder<ModelPermissionUser> {
        const query = this.initQuery(this.repository)
            .leftJoin('item.actionPermission', 'actionPermission')
            .leftJoin('item.modelPermission', 'modelPermission')
            .leftJoin('item.user', 'user')
            .select(['item' , 'actionPermission', 'modelPermission', 'user'])

        this.addConstraint(query, criteria.value, 'value = :value', {value: criteria.value});
        this.addConstraint(query, criteria.subAttribute, 'subAttribute = :subAttribute', {subAttribute: criteria.subAttribute});
        if (criteria.actionPermission) {
            const actionPermission = criteria.actionPermission;
            this.addConstraint(query, actionPermission.id, 'actionPermission.id = :actionPermissionId', {actionPermissionId: actionPermission.id,});
            this.addConstraint(query, actionPermission.reference, 'actionPermission.reference = :actionPermissionReference', {actionPermissionReference: actionPermission.reference,});
        }
        if (criteria.modelPermission) {
            const modelPermission = criteria.modelPermission;
            this.addConstraint(query, modelPermission.id, 'modelPermission.id = :modelPermissionId', {modelPermissionId: modelPermission.id,});
            this.addConstraint(query, modelPermission.reference, 'modelPermission.reference = :modelPermissionReference', {modelPermissionReference: modelPermission.reference,});
        }
        if (criteria.user) {
            const user = criteria.user;
            this.addConstraint(query, user.id, 'user.id = :userId', {userId: user.id,});
            this.addConstraint(query, user.username, 'user.username = :userUsername', {userUsername: user.username,});
        }
        return query;
    }

}

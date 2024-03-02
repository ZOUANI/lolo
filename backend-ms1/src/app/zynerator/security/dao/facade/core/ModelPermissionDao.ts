import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {AbstractRepository} from "src/app/zynerator/repository/AbstractRepository";
import {ModelPermission} from "src/app/zynerator/security/bean/core/ModelPermission";
import {ModelPermissionCriteria} from "src/app/zynerator/security/dao/criteria/core/ModelPermissionCriteria";


@Injectable()
export class ModelPermissionDao extends AbstractRepository<ModelPermission, ModelPermissionCriteria> {

    constructor(@InjectRepository(ModelPermission) private readonly repository: Repository<ModelPermission>,) {
        super(repository);
    }

    async save(item: ModelPermission): Promise<ModelPermission> {
        const savedItem = await this.repository.save(item);
        return savedItem;
    }


    async saveOrUpdate(item: ModelPermission): Promise<ModelPermission> {
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

    async  findAllOptimized(): Promise<ModelPermission[]> {
        return this.repository
                    .createQueryBuilder('item')
                    .select(['item.id AS id', 'item.reference AS reference'])
                    .getRawMany()
                    .then((result) => result.map((row) => new ModelPermission(row.id, row.reference)));


    }

    async  findAll(): Promise<ModelPermission[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<ModelPermission> {
        return this.repository.findOne({where: {id}});
    }


    async deleteById(id: number): Promise<number> {
        const result = await this.repository.delete({id});
        return result.affected;
    }



    public constructQuery(criteria: ModelPermissionCriteria): SelectQueryBuilder<ModelPermission> {
        const query = this.initQuery(this.repository);

        this.addConstraint(query, criteria.reference, 'reference = :reference', {reference: criteria.reference});
        this.addConstraint(query, criteria.libelle, 'libelle = :libelle', {libelle: criteria.libelle});
        return query;
    }

}

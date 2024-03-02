import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {AbstractRepository} from "src/app/zynerator/repository/AbstractRepository";
import {ActionPermission} from "src/app/zynerator/security/bean/core/ActionPermission";
import {ActionPermissionCriteria} from "src/app/zynerator/security/dao/criteria/core/ActionPermissionCriteria";


@Injectable()
export class ActionPermissionDao extends AbstractRepository<ActionPermission, ActionPermissionCriteria> {

    constructor(@InjectRepository(ActionPermission) private readonly repository: Repository<ActionPermission>,) {
        super(repository);
    }

    async save(item: ActionPermission): Promise<ActionPermission> {
        const savedItem = await this.repository.save(item);
        return savedItem;
    }
    async findOrSave(actionPermission: ActionPermission ): Promise<ActionPermission> {
        const existing = await this.findByReference(actionPermission.reference);
        if (existing) {
            return existing;
        }
        const result = await this.save(actionPermission);
        return result;
    }


    async saveOrUpdate(item: ActionPermission): Promise<ActionPermission> {
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

    async  findAllOptimized(): Promise<ActionPermission[]> {
        return this.repository
                    .createQueryBuilder('item')
                    .select(['item.id AS id', 'item.reference AS reference'])
                    .getRawMany()
                    .then((result) => result.map((row) => new ActionPermission(row.id, row.reference)));


    }

    async  findAll(): Promise<ActionPermission[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<ActionPermission> {
        return this.repository.findOne({where: {id}});
    }
    async findByReference(reference: string): Promise<ActionPermission> {
        return this.repository.findOne({where: {reference}});
    }


    async deleteById(id: number): Promise<number> {
        const result = await this.repository.delete({id});
        return result.affected;
    }



    public constructQuery(criteria: ActionPermissionCriteria): SelectQueryBuilder<ActionPermission> {
        const query = this.initQuery(this.repository);

        this.addConstraint(query, criteria.reference, 'reference = :reference', {reference: criteria.reference});
        this.addConstraint(query, criteria.libelle, 'libelle = :libelle', {libelle: criteria.libelle});
        return query;
    }

}

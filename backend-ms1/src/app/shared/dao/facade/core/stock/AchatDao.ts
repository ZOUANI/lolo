import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {AbstractRepository} from "src/app/zynerator/repository/AbstractRepository";

import {Achat} from "src/app/shared/bean/core/stock/Achat";
import {AchatDto} from "src/app/shared/dto/stock/AchatDto";
import {AchatCriteria} from "src/app/shared/dao/criteria/core/stock/AchatCriteria";

@Injectable()
export class AchatDao extends AbstractRepository<Achat, AchatCriteria> {

    constructor(@InjectRepository(Achat) private readonly repository: Repository<Achat>,) {
        super(repository);
    }

    async save(item: Achat): Promise<Achat> {
        const savedItem = await this.repository.save(item);
        return savedItem;
    }


    async saveOrUpdate(item: Achat): Promise<Achat> {
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

    async  findAllOptimized(): Promise<AchatDto[]> {
        return this.repository
                    .createQueryBuilder('item')
                    .select(['item.id AS id', 'item.reference AS reference'])
                    .getRawMany()
                    .then((result) => result.map((row) => new AchatDto(row.id, row.reference)));


    }

    async  findAll(): Promise<Achat[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<Achat> {
        return this.repository.findOne({where: {id}});
    }


    async deleteById(id: number): Promise<number> {
        const result = await this.repository.delete({id});
        return result.affected;
    }

    async findByClientId(id: number): Promise<Achat[]> {
        return this.repository.find({where: {client: {id}}});
    }

    async deleteByClientId(id: number): Promise<number> {
        const result = await this.repository.delete({client: {id}});
        return result.affected;
    }


    public constructQuery(criteria: AchatCriteria): SelectQueryBuilder<Achat> {
        const query = this.initQuery(this.repository)
            .leftJoin('item.client', 'client')
            .select(['item' , 'client'])

        this.addConstraint(query, criteria.reference, 'reference = :reference', {reference: criteria.reference});
        this.addConstraintMinMax(query, criteria.dateAchatFrom, criteria.dateAchatTo, 'dateAchat >= :dateAchatFrom', 'dateAchat <= :dateAchatTo', {dateAchatFrom: criteria.dateAchatFrom,dateAchatTo: criteria.dateAchatTo,});
        this.addConstraintMinMax(query, criteria.totalMin, criteria.totalMax, 'total >= :totalMin', 'total <= :totalMax', {totalMin: criteria.totalMin,totalMax: criteria.totalMax,});
        this.addConstraintMinMax(query, criteria.totalPayeMin, criteria.totalPayeMax, 'totalPaye >= :totalPayeMin', 'totalPaye <= :totalPayeMax', {totalPayeMin: criteria.totalPayeMin,totalPayeMax: criteria.totalPayeMax,});
        if (criteria.client) {
            const client = criteria.client;
            this.addConstraint(query, client.id, 'client.id = :clientId', {clientId: client.id,});
            this.addConstraint(query, client.nom, 'client.nom = :clientNom', {clientNom: client.nom,});
        }
        return query;
    }

}

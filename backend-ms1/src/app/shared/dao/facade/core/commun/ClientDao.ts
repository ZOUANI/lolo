import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {AbstractRepository} from "src/app/zynerator/repository/AbstractRepository";

import {Client} from "src/app/shared/bean/core/commun/Client";
import {ClientDto} from "src/app/shared/dto/commun/ClientDto";
import {ClientCriteria} from "src/app/shared/dao/criteria/core/commun/ClientCriteria";

@Injectable()
export class ClientDao extends AbstractRepository<Client, ClientCriteria> {

    constructor(@InjectRepository(Client) private readonly repository: Repository<Client>,) {
        super(repository);
    }

    async save(item: Client): Promise<Client> {
        const savedItem = await this.repository.save(item);
        return savedItem;
    }


    async saveOrUpdate(item: Client): Promise<Client> {
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

    async  findAllOptimized(): Promise<ClientDto[]> {
        return this.repository
                    .createQueryBuilder('item')
                    .select(['item.id AS id', 'item.nom AS nom'])
                    .getRawMany()
                    .then((result) => result.map((row) => new ClientDto(row.id, row.nom)));


    }

    async  findAll(): Promise<Client[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<Client> {
        return this.repository.findOne({where: {id}});
    }


    async deleteById(id: number): Promise<number> {
        const result = await this.repository.delete({id});
        return result.affected;
    }



    public constructQuery(criteria: ClientCriteria): SelectQueryBuilder<Client> {
        const query = this.initQuery(this.repository);

        this.addConstraint(query, criteria.cin, 'cin = :cin', {cin: criteria.cin});
        this.addConstraint(query, criteria.nom, 'nom = :nom', {nom: criteria.nom});
        this.addConstraint(query, criteria.tel, 'tel = :tel', {tel: criteria.tel});
        this.addConstraint(query, criteria.email, 'email = :email', {email: criteria.email});
        this.addConstraint(query, criteria.adresse, 'adresse = :adresse', {adresse: criteria.adresse});
        this.addConstraintMinMax(query, criteria.creanceMin, criteria.creanceMax, 'creance >= :creanceMin', 'creance <= :creanceMax', {creanceMin: criteria.creanceMin,creanceMax: criteria.creanceMax,});
        return query;
    }

}

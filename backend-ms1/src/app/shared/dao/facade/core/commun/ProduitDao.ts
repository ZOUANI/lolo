import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {AbstractRepository} from "src/app/zynerator/repository/AbstractRepository";

import {Produit} from "src/app/shared/bean/core/commun/Produit";
import {ProduitDto} from "src/app/shared/dto/commun/ProduitDto";
import {ProduitCriteria} from "src/app/shared/dao/criteria/core/commun/ProduitCriteria";

@Injectable()
export class ProduitDao extends AbstractRepository<Produit, ProduitCriteria> {

    constructor(@InjectRepository(Produit) private readonly repository: Repository<Produit>,) {
        super(repository);
    }

    async save(item: Produit): Promise<Produit> {
        const savedItem = await this.repository.save(item);
        return savedItem;
    }


    async saveOrUpdate(item: Produit): Promise<Produit> {
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

    async  findAllOptimized(): Promise<ProduitDto[]> {
        return this.repository
                    .createQueryBuilder('item')
                    .select(['item.id AS id', 'item.reference AS reference'])
                    .getRawMany()
                    .then((result) => result.map((row) => new ProduitDto(row.id, row.reference)));


    }

    async  findAll(): Promise<Produit[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<Produit> {
        return this.repository.findOne({where: {id}});
    }


    async deleteById(id: number): Promise<number> {
        const result = await this.repository.delete({id});
        return result.affected;
    }



    public constructQuery(criteria: ProduitCriteria): SelectQueryBuilder<Produit> {
        const query = this.initQuery(this.repository);

        this.addConstraint(query, criteria.reference, 'reference = :reference', {reference: criteria.reference});
        this.addConstraint(query, criteria.libelle, 'libelle = :libelle', {libelle: criteria.libelle});
        this.addConstraint(query, criteria.barcode, 'barcode = :barcode', {barcode: criteria.barcode});
        this.addConstraintMinMax(query, criteria.prixAchatMoyenMin, criteria.prixAchatMoyenMax, 'prixAchatMoyen >= :prixAchatMoyenMin', 'prixAchatMoyen <= :prixAchatMoyenMax', {prixAchatMoyenMin: criteria.prixAchatMoyenMin,prixAchatMoyenMax: criteria.prixAchatMoyenMax,});
        this.addConstraintMinMax(query, criteria.quantiteMin, criteria.quantiteMax, 'quantite >= :quantiteMin', 'quantite <= :quantiteMax', {quantiteMin: criteria.quantiteMin,quantiteMax: criteria.quantiteMax,});
        this.addConstraintMinMax(query, criteria.seuilAlertMin, criteria.seuilAlertMax, 'seuilAlert >= :seuilAlertMin', 'seuilAlert <= :seuilAlertMax', {seuilAlertMin: criteria.seuilAlertMin,seuilAlertMax: criteria.seuilAlertMax,});
        return query;
    }

}

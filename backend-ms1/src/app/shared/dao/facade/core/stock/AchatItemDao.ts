import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {AbstractRepository} from "src/app/zynerator/repository/AbstractRepository";

import {AchatItem} from "src/app/shared/bean/core/stock/AchatItem";
import {AchatItemDto} from "src/app/shared/dto/stock/AchatItemDto";
import {AchatItemCriteria} from "src/app/shared/dao/criteria/core/stock/AchatItemCriteria";

@Injectable()
export class AchatItemDao extends AbstractRepository<AchatItem, AchatItemCriteria> {

    constructor(@InjectRepository(AchatItem) private readonly repository: Repository<AchatItem>,) {
        super(repository);
    }

    async save(item: AchatItem): Promise<AchatItem> {
        const savedItem = await this.repository.save(item);
        return savedItem;
    }


    async saveOrUpdate(item: AchatItem): Promise<AchatItem> {
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

    async  findAllOptimized(): Promise<AchatItemDto[]> {
        return this.repository
                    .createQueryBuilder('item')
                    .select(['item.id AS id'])
                    .getRawMany()
                    .then((result) => result.map((row) => new AchatItemDto(row.id)));


    }

    async  findAll(): Promise<AchatItem[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<AchatItem> {
        return this.repository.findOne({where: {id}});
    }


    async deleteById(id: number): Promise<number> {
        const result = await this.repository.delete({id});
        return result.affected;
    }

    async findByProduitId(id: number): Promise<AchatItem[]> {
        return this.repository.find({where: {produit: {id}}});
    }

    async deleteByProduitId(id: number): Promise<number> {
        const result = await this.repository.delete({produit: {id}});
        return result.affected;
    }
    async findByAchatId(id: number): Promise<AchatItem[]> {
        return this.repository.find({where: {achat: {id}}});
    }

    async deleteByAchatId(id: number): Promise<number> {
        const result = await this.repository.delete({achat: {id}});
        return result.affected;
    }


    public constructQuery(criteria: AchatItemCriteria): SelectQueryBuilder<AchatItem> {
        const query = this.initQuery(this.repository)
            .leftJoin('item.produit', 'produit')
            .leftJoin('item.achat', 'achat')
            .select(['item' , 'produit', 'achat'])

        this.addConstraintMinMax(query, criteria.prixUnitaireMin, criteria.prixUnitaireMax, 'prixUnitaire >= :prixUnitaireMin', 'prixUnitaire <= :prixUnitaireMax', {prixUnitaireMin: criteria.prixUnitaireMin,prixUnitaireMax: criteria.prixUnitaireMax,});
        this.addConstraintMinMax(query, criteria.prixVenteMin, criteria.prixVenteMax, 'prixVente >= :prixVenteMin', 'prixVente <= :prixVenteMax', {prixVenteMin: criteria.prixVenteMin,prixVenteMax: criteria.prixVenteMax,});
        this.addConstraintMinMax(query, criteria.quantiteMin, criteria.quantiteMax, 'quantite >= :quantiteMin', 'quantite <= :quantiteMax', {quantiteMin: criteria.quantiteMin,quantiteMax: criteria.quantiteMax,});
        this.addConstraintMinMax(query, criteria.quantiteAvoirMin, criteria.quantiteAvoirMax, 'quantiteAvoir >= :quantiteAvoirMin', 'quantiteAvoir <= :quantiteAvoirMax', {quantiteAvoirMin: criteria.quantiteAvoirMin,quantiteAvoirMax: criteria.quantiteAvoirMax,});
        this.addConstraintMinMax(query, criteria.remiseMin, criteria.remiseMax, 'remise >= :remiseMin', 'remise <= :remiseMax', {remiseMin: criteria.remiseMin,remiseMax: criteria.remiseMax,});
        if (criteria.produit) {
            const produit = criteria.produit;
            this.addConstraint(query, produit.id, 'produit.id = :produitId', {produitId: produit.id,});
            this.addConstraint(query, produit.reference, 'produit.reference = :produitReference', {produitReference: produit.reference,});
        }
        if (criteria.achat) {
            const achat = criteria.achat;
            this.addConstraint(query, achat.id, 'achat.id = :achatId', {achatId: achat.id,});
            this.addConstraint(query, achat.reference, 'achat.reference = :achatReference', {achatReference: achat.reference,});
        }
        return query;
    }

}

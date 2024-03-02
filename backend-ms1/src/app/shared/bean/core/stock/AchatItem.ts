import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import {Achat} from "src/app/shared/bean/core/stock/Achat";
import {Produit} from "src/app/shared/bean/core/commun/Produit";

import {AuditBusinessObject} from "src/app/zynerator/audit/AuditBusinessObject";

@Entity('achat_item')
export class AchatItem  extends AuditBusinessObject {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    prixUnitaire: number;
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    prixVente: number;
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    quantite: number;
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    quantiteAvoir: number;
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    remise: number;
    @ManyToOne(() => Produit, { eager: true })
    @JoinColumn({ name: 'produit' })
    produit: Produit;
    @ManyToOne(() => Achat, { eager: true })
    @JoinColumn({ name: 'achat' })
    achat: Achat;
}

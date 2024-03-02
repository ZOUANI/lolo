import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


import {AuditBusinessObject} from "src/app/zynerator/audit/AuditBusinessObject";

@Entity('produit')
export class Produit  extends AuditBusinessObject {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 500 , nullable: true})
    reference: string;
    @Column({ length: 500 , nullable: true})
    libelle: string;
    @Column({ length: 500 , nullable: true})
    barcode: string;
    @Column({ length: 500 , nullable: true})
    discription: string;
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    prixAchatMoyen: number;
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    quantite: number;
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    seuilAlert: number;
}

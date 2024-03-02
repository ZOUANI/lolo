import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import {AchatItem} from "src/app/shared/bean/core/stock/AchatItem";
import {Client} from "src/app/shared/bean/core/commun/Client";
import {Produit} from "src/app/shared/bean/core/commun/Produit";

import {AuditBusinessObject} from "src/app/zynerator/audit/AuditBusinessObject";

@Entity('achat')
export class Achat  extends AuditBusinessObject {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 500 , nullable: true})
    reference: string;
    @Column({nullable: true})
    dateAchat: Date;
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    total: number;
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    totalPaye: number;
    @Column({ length: 500 , nullable: true})
    description: string;
    @ManyToOne(() => Client, { eager: true })
    @JoinColumn({ name: 'client' })
    client: Client;
    @OneToMany(() => AchatItem, achatItem => achatItem.achat)
    achatItems: AchatItem[];
}

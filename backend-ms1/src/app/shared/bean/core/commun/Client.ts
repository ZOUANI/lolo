import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


import {AuditBusinessObject} from "src/app/zynerator/audit/AuditBusinessObject";

@Entity('client')
export class Client  extends AuditBusinessObject {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 500 , nullable: true})
    cin: string;
    @Column({ length: 500 , nullable: true})
    nom: string;
    @Column({ length: 500 , nullable: true})
    tel: string;
    @Column({ length: 500 , nullable: true})
    email: string;
    @Column({ length: 500 , nullable: true})
    adresse: string;
    @Column({ length: 500 , nullable: true})
    description: string;
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    creance: number;
}

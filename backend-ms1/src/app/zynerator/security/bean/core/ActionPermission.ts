import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';


import {AuditBusinessObject} from "src/app/zynerator/audit/AuditBusinessObject";

@Entity('action_permission')
export class ActionPermission  extends AuditBusinessObject {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 500 ,nullable: true})
    reference: string;
    @Column({ length: 500 , nullable: true})
    libelle: string;
    constructor(id?: number, reference?: string) {
        super();
        this.id = id;
        this.reference = reference;
    }
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';


import {AuditBusinessObject} from "src/app/zynerator/audit/AuditBusinessObject";

@Entity('model_permission')
export class ModelPermission  extends AuditBusinessObject {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 500, nullable: true })
    reference: string;
    @Column({ length: 500, nullable: true })
    libelle: string;
    constructor(id?: number, reference?: string) {
        super();
        this.id = id;
        this.reference = reference;
    }
}

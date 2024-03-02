import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';


import {AuditBusinessObject} from "src/app/zynerator/audit/AuditBusinessObject";

@Entity("role_app")
export class Role  extends AuditBusinessObject {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 500 , nullable: true})
    authority: string;
}

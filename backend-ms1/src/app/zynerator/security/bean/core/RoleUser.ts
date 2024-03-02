import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

import {User} from "src/app/zynerator/security/bean/core/User";
import {Role} from "src/app/zynerator/security/bean/core/Role";

import {AuditBusinessObject} from "src/app/zynerator/audit/AuditBusinessObject";

@Entity('role_user')
export class RoleUser  extends AuditBusinessObject {

    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'user' })
    user: User;
    @ManyToOne(() => Role, { eager: true })
    @JoinColumn({ name: 'role' })
    role: Role;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany,JoinColumn } from 'typeorm';

import {User} from "src/app/zynerator/security/bean/core/User";
import {ModelPermission} from "src/app/zynerator/security/bean/core/ModelPermission";
import {ActionPermission} from "src/app/zynerator/security/bean/core/ActionPermission";

import {AuditBusinessObject} from "src/app/zynerator/audit/AuditBusinessObject";

@Entity('model_permission_user')
export class ModelPermissionUser  extends AuditBusinessObject {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ default: false })
    value: boolean;
    @Column({ length: 500, nullable: true })
    subAttribute: string;
    @ManyToOne(() => ActionPermission, { eager: true })
    actionPermission: ActionPermission;
    @ManyToOne(() => ModelPermission, { eager: true })
    modelPermission: ModelPermission;
    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'user' })
    user: User;
constructor(id?: number, value?: boolean, subAttribute?: string) {
        super();
        this.id = id;
        this.value = value;
        this.subAttribute = subAttribute;
    }
}

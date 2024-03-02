import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';


import {AuditBusinessObject} from "src/app/zynerator/audit/AuditBusinessObject";
import {RoleUser} from "src/app/zynerator/security/bean/core/RoleUser";
import {ModelPermissionUser} from "src/app/zynerator/security/bean/core/ModelPermissionUser";

@Entity("user_app")
export class User  extends AuditBusinessObject {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ default: false })
    credentialsNonExpired: boolean;
    @Column({ default: false })
    enabled: boolean;
    @Column({ length: 500 })
    email: string;
    @Column({ default: false })
    accountNonExpired: boolean;
    @Column({ default: false })
    accountNonLocked: boolean;
    @Column({ length: 500 })
    username: string;
    @Column({ length: 500 })
    password: string;
    @Column({ default: false })
    passwordChanged: boolean;
    @Column({ length: 500 , nullable: true})
    lastName: string;
    @Column({ length: 500 , nullable: true})
    firstName: string;
    @Column({ length: 500 , nullable: true})
    phone: string;
    @OneToMany(() => RoleUser, roleUser => roleUser.user)
    roleUsers: RoleUser[];
    @OneToMany(() => ModelPermissionUser, modelPermissionUser => modelPermissionUser.user)
    modelPermissionUsers: ModelPermissionUser[];
}

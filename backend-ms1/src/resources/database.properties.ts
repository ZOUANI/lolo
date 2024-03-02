import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {Client} from "src/app/shared/bean/core/commun/Client";
import {Achat} from "src/app/shared/bean/core/stock/Achat";
import {AchatItem} from "src/app/shared/bean/core/stock/AchatItem";
import {Produit} from "src/app/shared/bean/core/commun/Produit";
import {RoleUser} from "src/app/zynerator/security/bean/core/RoleUser";
import {Role} from "src/app/zynerator/security/bean/core/Role";
import {ModelPermissionUser} from "src/app/zynerator/security/bean/core/ModelPermissionUser";
import {ActionPermission} from "src/app/zynerator/security/bean/core/ActionPermission";
import {ModelPermission} from "src/app/zynerator/security/bean/core/ModelPermission";
import {User} from "src/app/zynerator/security/bean/core/User";

const  databaseProperties : TypeOrmModuleOptions =    {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username:'root',
    password:'',
    database: 'stocky',
    synchronize:true,
    entities: [  Client ,  Achat ,  AchatItem ,  Produit ,  User, Role, RoleUser ,  ModelPermissionUser ,  ActionPermission ,  ModelPermission ],

};
export  default databaseProperties;

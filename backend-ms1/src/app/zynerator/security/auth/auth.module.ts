import {Module} from "@nestjs/common";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./constants";
import {JwtStrategy} from "./jwt.strategy";

import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "src/app/zynerator/security/bean/core/User";
import {Role} from "src/app/zynerator/security/bean/core/Role";
import {UserDao} from "src/app/zynerator/security/dao/facade/core/UserDao";
import {UserServiceImpl} from "src/app/zynerator/security/service/UserServiceImpl";
import {RoleDao} from "src/app/zynerator/security/dao/facade/core/RoleDao";
import {RoleServiceImpl} from "src/app/zynerator/security/service/RoleServiceImpl";
import {UserRest} from "src/app/zynerator/security/ws/UserRest";
import {RoleRest} from "src/app/zynerator/security/ws/RoleRest";
import {RoleUser} from "src/app/zynerator/security/bean/core/RoleUser";
import {ModelPermission} from "src/app/zynerator/security/bean/core/ModelPermission";
import {ModelPermissionUser} from "src/app/zynerator/security/bean/core/ModelPermissionUser";
import {ActionPermission} from "src/app/zynerator/security/bean/core/ActionPermission";
import {ModelPermissionUserDao} from "src/app/zynerator/security/dao/facade/core/ModelPermissionUserDao";
import {ModelPermissionUserServiceImpl} from "src/app/zynerator/security/service/ModelPermissionUserServiceImpl";
import {RoleUserServiceImpl} from "src/app/zynerator/security/service/RoleUserServiceImpl";
import {RoleUserDao} from "src/app/zynerator/security/dao/facade/core/RoleUserDao";
import {RoleUserConverter} from "src/app/zynerator/security/converter/RoleUserConverter";
import {RoleConverter} from "src/app/zynerator/security/converter/RoleConverter";
import {ModelPermissionUserConverter} from "src/app/zynerator/security/converter/ModelPermissionUserConverter";
import {ActionPermissionServiceImpl} from "src/app/zynerator/security/service/ActionPermissionServiceImpl";
import {ActionPermissionDao} from "src/app/zynerator/security/dao/facade/core/ActionPermissionDao";
import {ActionPermissionConverter} from "src/app/zynerator/security/converter/ActionPermissionConverter";
import {ModelPermissionServiceImpl} from "src/app/zynerator/security/service/ModelPermissionServiceImpl";
import {ModelPermissionDao} from "src/app/zynerator/security/dao/facade/core/ModelPermissionDao";
import {ModelPermissionConverter} from "src/app/zynerator/security/converter/ModelPermissionConverter";
import {UserConverter} from "src/app/zynerator/security/converter/UserConverter";
import {RoleUserRest} from "src/app/zynerator/security/ws/RoleUserRest";
import {ModelPermissionUserRest} from "src/app/zynerator/security/ws/ModelPermissionUserRest";
import {ActionPermissionRest} from "src/app/zynerator/security/ws/ActionPermissionRest";
import {ModelPermissionRest} from "src/app/zynerator/security/ws/ModelPermissionRest";
import {AuthController} from "src/app/zynerator/security/ws/AuthController";


@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role, RoleUser, ModelPermission, ModelPermissionUser, ActionPermission]),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: "1h"} // Token expiration time
        })
    ],
    providers: [JwtStrategy, RoleUserServiceImpl ,   RoleUserDao , RoleUserConverter ,
        RoleServiceImpl ,   RoleDao , RoleConverter ,
        ModelPermissionUserServiceImpl ,   ModelPermissionUserDao , ModelPermissionUserConverter ,
        ActionPermissionServiceImpl ,   ActionPermissionDao , ActionPermissionConverter ,
        ModelPermissionServiceImpl ,   ModelPermissionDao , ModelPermissionConverter ,
        UserServiceImpl ,   UserDao , UserConverter ],
    controllers: [AuthController, RoleUserRest ,  RoleRest ,  ModelPermissionUserRest ,  ActionPermissionRest ,  ModelPermissionRest ,  UserRest ],
    exports: [JwtModule]
})
export class AuthModule {
}
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';

import {ActionPermissionDto} from 'src/app/zynerator/security/controller/model/ActionPermission.model';
import {ActionPermissionCriteria} from 'src/app/zynerator/security/controller/criteria/ActionPermissionCriteria.model';
import {AbstractService} from 'src/app/zynerator/service/AbstractService';
import {RoleService} from './Role.service';


@Injectable({
  providedIn: 'root'
})
export class ActionPermissionService extends AbstractService<ActionPermissionDto, ActionPermissionCriteria> {
     constructor(private http: HttpClient, private roleService: RoleService) {
        super();
        this.setHttp(http);
        this.setApi(environment.apiUrl + 'actionPermission/');
    }

    public constrcutDto(): ActionPermissionDto {
        return new ActionPermissionDto();
    }

    public constrcutCriteria(): ActionPermissionCriteria {
        return new ActionPermissionCriteria();
    }
}

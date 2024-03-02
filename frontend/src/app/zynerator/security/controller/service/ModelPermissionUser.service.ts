import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';

import {ModelPermissionUserDto} from 'src/app/zynerator/security/controller/model/ModelPermissionUser.model';
import {ModelPermissionUserCriteria} from 'src/app/zynerator/security/controller/criteria/ModelPermissionUserCriteria.model';
import {AbstractService} from 'src/app/zynerator/service/AbstractService';
import {RoleService} from './Role.service';
import {Observable} from 'rxjs';
import {PaginatedList} from '../../../dto/PaginatedList.model';


@Injectable({
  providedIn: 'root'
})
export class ModelPermissionUserService extends AbstractService<ModelPermissionUserDto, ModelPermissionUserCriteria> {
     constructor(private http: HttpClient, private roleService: RoleService) {
        super();
        this.setHttp(http);
        this.setApi(environment.apiUrl + 'modelPermissionUser/');
    }
    public initModelPermissionUser(): Observable<Array<ModelPermissionUserDto>> {
        return this.http.get<Array<ModelPermissionUserDto>>(this.API + 'init-ModelPermissionUser');
    }


    public constrcutDto(): ModelPermissionUserDto {
        return new ModelPermissionUserDto();
    }

    public constrcutCriteria(): ModelPermissionUserCriteria {
        return new ModelPermissionUserCriteria();
    }
}

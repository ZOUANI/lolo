import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

import {environment} from 'src/environments/environment';

import {AchatItemDto} from 'src/app/controller/model/stock/AchatItem.model';
import {AchatItemCriteria} from 'src/app/controller/criteria/stock/AchatItemCriteria.model';
import {AbstractService} from 'src/app/zynerator/service/AbstractService';


@Injectable({
  providedIn: 'root'
})
export class AchatItemAdminService extends AbstractService<AchatItemDto, AchatItemCriteria> {
     constructor(private http: HttpClient) {
        super();
        this.setHttp(http);
        this.setApi(environment.apiUrl + 'admin/achatItem/');
    }

    public constrcutDto(): AchatItemDto {
        return new AchatItemDto();
    }

    public constrcutCriteria(): AchatItemCriteria {
        return new AchatItemCriteria();
    }
}

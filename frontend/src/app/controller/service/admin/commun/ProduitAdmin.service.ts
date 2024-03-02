import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

import {environment} from 'src/environments/environment';

import {ProduitDto} from 'src/app/controller/model/commun/Produit.model';
import {ProduitCriteria} from 'src/app/controller/criteria/commun/ProduitCriteria.model';
import {AbstractService} from 'src/app/zynerator/service/AbstractService';


@Injectable({
  providedIn: 'root'
})
export class ProduitAdminService extends AbstractService<ProduitDto, ProduitCriteria> {
     constructor(private http: HttpClient) {
        super();
        this.setHttp(http);
        this.setApi(environment.apiUrl + 'admin/produit/');
    }

    public constrcutDto(): ProduitDto {
        return new ProduitDto();
    }

    public constrcutCriteria(): ProduitCriteria {
        return new ProduitCriteria();
    }
}

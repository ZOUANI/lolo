import {Component, OnInit} from '@angular/core';


import {AbstractViewController} from 'src/app/zynerator/controller/AbstractViewController';
import { environment } from 'src/environments/environment';

import {ModelPermissionService} from 'src/app/zynerator/security/controller/service/ModelPermission.service';
import {ModelPermissionDto} from 'src/app/zynerator/security/controller/model/ModelPermission.model';
import {ModelPermissionCriteria} from 'src/app/zynerator/security/controller/criteria/ModelPermissionCriteria.model';

@Component({
  selector: 'app-model-permission-view',
  templateUrl: './model-permission-view.component.html'
})
export class ModelPermissionViewComponent extends AbstractViewController<ModelPermissionDto, ModelPermissionCriteria, ModelPermissionService> implements OnInit {


    constructor(private modelPermissionService: ModelPermissionService){
        super(modelPermissionService);
    }

    ngOnInit(): void {
    }




}

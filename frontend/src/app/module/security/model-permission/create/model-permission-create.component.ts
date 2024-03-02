import {Component, OnInit, Input} from '@angular/core';

import { AbstractCreateController } from 'src/app/zynerator/controller/AbstractCreateController';

import {ModelPermissionService} from 'src/app/zynerator/security/controller/service/ModelPermission.service';
import {ModelPermissionDto} from 'src/app/zynerator/security/controller/model/ModelPermission.model';
import {ModelPermissionCriteria} from 'src/app/zynerator/security/controller/criteria/ModelPermissionCriteria.model';
@Component({
  selector: 'app-model-permission-create',
  templateUrl: './model-permission-create.component.html'
})
export class ModelPermissionCreateComponent extends AbstractCreateController<ModelPermissionDto, ModelPermissionCriteria, ModelPermissionService>  implements OnInit {



   private _validModelPermissionReference = true;

    constructor( private modelPermissionService: ModelPermissionService ) {
        super(modelPermissionService);
    }

    ngOnInit(): void {
    }





    public override setValidation(value: boolean){
        this.validModelPermissionReference = value;
    }



    public override validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateModelPermissionReference();
    }

    public validateModelPermissionReference(){
        if (this.stringUtilService.isEmpty(this.item.reference)) {
        this.errorMessages.push('Reference non valide');
        this.validModelPermissionReference = false;
        } else {
            this.validModelPermissionReference = true;
        }
    }






    get validModelPermissionReference(): boolean {
        return this._validModelPermissionReference;
    }

    set validModelPermissionReference(value: boolean) {
         this._validModelPermissionReference = value;
    }



}

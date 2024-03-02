import {Component, OnInit} from '@angular/core';


import {AbstractViewController} from 'src/app/zynerator/controller/AbstractViewController';
import { environment } from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/controller/service/Role.service';
import {RoleDto} from 'src/app/zynerator/security/controller/model/Role.model';
import {RoleCriteria} from 'src/app/zynerator/security/controller/criteria/RoleCriteria.model';

@Component({
  selector: 'app-role-view',
  templateUrl: './role-view.component.html'
})
export class RoleViewComponent extends AbstractViewController<RoleDto, RoleCriteria, RoleService> implements OnInit {


    constructor(private roleservice: RoleService){
        super(roleservice);
    }

    ngOnInit(): void {
    }




}

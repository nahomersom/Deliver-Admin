import { T } from '@angular/cdk/keycodes';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root',
})
export class AppUserAuth {
  id: string;
  full_name: string;
  token: string;
  role: RoleModel[] = [];
}

export interface RoleModel {
  title: string;
  page: string;
  canAdd: any;
  canUpdate: any;
  canDelete: any;
  canView: any;
  canViewDetail: any;
}

@Injectable()
export class SecurityService {
  [x: string]: any;
 securityObject: AppUserAuth = {
   id:null,
   full_name:null, 
   token:null,
   role:[]
 }
  // securityObject: AppUserAuth = {
  //   id: '61b48d106d9d8439364344',
  //   full_name: 'nahom',
  //   token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjYxODM3MmY4YjBhY2Q5NDI0ODM3MzMi.ir9iu301XjJMyGYtQxqkfRS5DhwtUfDJ21EAidTUsCk',
  //   role: []
  // };
  constructor(public security:ToastrService,public crud_service:CrudOperationService,private router: Router) {}

  gridAction(page: string) {
    return { edit: this.hasClaim(page, 'canUpdate'), delete: this.hasClaim(page, 'canDelete'), view: this.hasClaim(page, 'canViewDetail') };
  }

  hasClaim(page: string, action: string) {
    let truth = false;

    for (let element of this.securityObject.role) {
      if((element.page).toLowerCase() === page.toLowerCase()){
        element[action] ? truth = true : null; 

        break;
      }
    }

    return true;
    
  }

  public  logout() {
    this.crud_service.list('util/dashboard/logout').subscribe( (res: any) => {
      this.crud_service.deleteCookie();
      this.securityObject = null;
     this.router.navigateByUrl('authentication/login');
    });
 
  }


}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { CookieEncryptionService } from '@core/security/cookie-encryption.service';
import { SecurityService } from '@core/security/security.service';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public url: any = environment.baseUrl;
  constructor(
    private service: SecurityService, 
    public router: Router, 
    private http: HttpClient,
    private crudService:CrudOperationService,
    private encryptDecryptCookie:CookieEncryptionService
    ) {
    // if (this.service.securityObject === null){
    //   this.get_logged_in_data();
    // }
   this.get_logged_in_data();
  }
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof ActivationEnd) {
        // this.httpCancelService.cancelPendingRequests()
      }
    });
  }

  public get_logged_in_data(){
    // this.http.get(this.url + '/util/dashboard/is_logged_in').subscribe((data: any) => {
    //   data ? this.service.securityObject = data : this.router.navigate(['/authentication/login']);
    // });
     
    if(this.crudService.getCookie('userInfo')){
  
      this.service.securityObject = JSON.parse(this.encryptDecryptCookie.decrypt(this.crudService.getCookie('userInfo')));
    }else{
      this.router.navigate(['authentication/login']);
    }
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private router: Router,
    private service: SecurityService,
    private toastr: ToastrService
  ) {
    this.toastr.toastrConfig.enableHtml = true;

   }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.service.hasClaim(next.data.page, next.data.action)) {
      return true;

    } else {
        this.toastr.error('au authorized to open this page.', 'Error');
        return false;

    }

}


}


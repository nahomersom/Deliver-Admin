import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { SecurityService } from '@core/security/security.service';
import { HttpCancelService } from './HttpCancelService';

@Injectable({
  providedIn: 'root'
})
export class InterceptorsService {

  constructor(private service: SecurityService, private httpCancelService: HttpCancelService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.service.securityObject.token) {
      const cloned = req.clone({ headers: req.headers.set('Authorization', this.service.securityObject.token)});
      return next.handle(cloned).pipe(
        map(response => {
          if (response instanceof HttpResponse) {
            //this.service.securityObject.key = response.body.token;
            return  response;
          }
        }),
        takeUntil(this.httpCancelService.onCancelPendingRequests())
      );
    }else {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', ""),
      });
      return next.handle(cloned);
    }

  }

}

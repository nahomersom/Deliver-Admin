import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.baseUrl;
  private singleAuthUrl = environment.loginUrl;

  constructor(private httpClient: HttpClient) { }

  post(payload: any, endPoint: string, lookup = false): any {
    let url: string;
    if(lookup){
      // url = 'http://192.168.0.111/SingleAuth/'  + endPoint ;
      url = this.singleAuthUrl  + endPoint ;
     
    }else{ 

      url = this.baseUrl + endPoint;
    }

     return this.httpClient.post(url, payload)
  }
  

  list(endPoint: string,lookup = false) {
    const url = lookup ? this.singleAuthUrl : this.baseUrl;
    return this.httpClient.get(url + endPoint);
  }


  detail(id: number, endPoint: string,userProfile:boolean = null) {
    if(userProfile){
      return this.httpClient.get(this.singleAuthUrl + endPoint + '/' + id);
    }else{
      return this.httpClient.get(this.baseUrl + endPoint + '/' + id);
    }
  
  }

  delete(data: any, endPoint: string): any {
    return this.httpClient.post(this.baseUrl + endPoint, data);
  }


}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpServiceBase } from './http-service.base.service';
import { HttpRequestModel } from '../../Model/http-requests.model';
import { iuser } from '../../Model/iuser';
import { ConfigurationService } from '../configuration.service';  
@Injectable({  providedIn: 'root'})
export class AuthService extends HttpServiceBase {
  
  private get _serverUrl(): string {
    return `${this.config.ips.servicePath}auth/`;
  }

  login$({userName, password}:{userName:string, password:string}): Observable<iuser> {
   return this.get$<iuser>(new HttpRequestModel({
      url: this._serverUrl,
      action: 'check-login',
      params:{userName, password}
    }));
  }

}

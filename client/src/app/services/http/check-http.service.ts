import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpServiceBase } from '../http/http-service.base.service';
import { HttpRequestModel } from '../../Model/http-requests.model'
@Injectable({  providedIn: 'root'})
export class CheckHttpService extends HttpServiceBase {
  
  private get _serverUrl(): string {
    const servicePath = this.config.ips.servicePath ?? 'http://localhost:3030/';
    return `${servicePath}checkConnection/`;
  }

  check$(): Observable<boolean> {
   return this.get$<boolean>(new HttpRequestModel({
      url: this._serverUrl,
      action: 'checkconnection',
    }));
  }

}





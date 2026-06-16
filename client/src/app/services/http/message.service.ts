import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestModel } from '../../Model/http-requests.model';
import { HttpServiceBase } from './http-service.base.service'; 


@Injectable({  providedIn: 'root'})
export class MessageService extends HttpServiceBase {

   private get _serverUrl(): string {
      return `${this.config.ips.servicePath}messages/`;
   }

   sendMessage$(userName:string, message:string): Observable<Boolean> {
       return this.post$<Boolean>(new HttpRequestModel({
        url: this._serverUrl,
        action: 'send-massage',
        params:{userName},
         body:{message}
      }));
    }
     
}


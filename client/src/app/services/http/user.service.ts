import { Injectable } from '@angular/core';
import { HttpServiceBase } from './http-service.base.service';
import { Observable } from 'rxjs';
import { iuser } from '../../Model/iuser';
import { HttpRequestModel } from '../../Model/http-requests.model';

@Injectable({  providedIn: 'root'})
export class UsersService extends HttpServiceBase {

   private get _serverUrl(): string {
      return `${this.config.ips.servicePath}users/`;
   }

   getUsers$(): Observable<iuser[]> {
       return this.get$<iuser[]>(new HttpRequestModel({
        url: this._serverUrl,
        action: 'getusers',
      }));
    }

    addUser$(user: iuser): Observable<Boolean>{
      return this.post$<Boolean>(new HttpRequestModel({
        url: this._serverUrl,
        action: 'adduser',
        body:user
      }));
    }

   deleteUser$(userId: number): Observable<Boolean>{
      return this.delete$<Boolean>(new HttpRequestModel({
        url: this._serverUrl,
        action: 'deleteuser',
        params:{userId}
      }));
    }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestModel } from '../../Model/http-requests.model';
import { HttpServiceBase } from './http-service.base.service';
import { Itask } from '../../Model/itask';

@Injectable({  providedIn: 'root'})
export class TasksService extends HttpServiceBase {

   private get _serverUrl(): string {
      return `${this.config.ips.servicePath}tasks/`;
   }

   getTasks$(): Observable<Itask[]> {
       return this.get$<Itask[]>(new HttpRequestModel({
        url: this._serverUrl,
        action: 'getTasks',
      }));
    }

    addTask$(task: Itask): Observable<Boolean>{
      return this.post$<Boolean>(new HttpRequestModel({
        url: this._serverUrl,
        action: 'addtask',
        body:task
      }));
    }

    updateTask$(task: Itask): Observable<Boolean>{
      return this.put$<Boolean>(new HttpRequestModel({
        url: this._serverUrl,
        action: 'updateTask',
        body:task
      }));
    }

     deleteTask$(taskId: number): Observable<Boolean>{
      return this.delete$<Boolean>(new HttpRequestModel({
        url: this._serverUrl,
        action: 'deleteTask',
        params:{taskId}
      }));
    }
}

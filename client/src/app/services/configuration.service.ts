import { EventEmitter, inject, Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, switchMap } from 'rxjs/operators';
import { IpConfig } from '../Model/ip-config';
import { SettingsConfig } from '../Model/settings';
import { WebsocketService } from './http/web-socket.service';

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
  ips: IpConfig = {} as IpConfig;
  settingConfig: SettingsConfig = {} as SettingsConfig;
  http = inject(HttpClient);
  messageEvent = new EventEmitter<string>();
  importantEvent = new EventEmitter<string>();
  private websocketService = inject(WebsocketService);

  initConfiguration(path:string): Promise<any> {
    
    return combineLatest(
      this.http.get<IpConfig>(`${path}/ipConfig.json`),
      this.http.get<SettingsConfig>(`${path}/settingsConfig.json`)
    ).pipe(
      tap(response => console.log(response)),
      tap(response => [this.ips, this.settingConfig] = response),
      tap(_ => this.initWS())
    ).toPromise();
  }

    initWS(){
      const wsUrl = this.ips.webSocketPath ; 
      this.websocketService.init(wsUrl);
        this.websocketService.messages
        .subscribe({
          next: (msg) => {
            // Emit raw data to listeners
            this.messageEvent.emit(msg.data);

            // Try to parse msg.data (may be JSON string) for clearer logging
            let parsedData: any = msg.data;
            if (typeof msg.data === 'string') {
              try {
                parsedData = JSON.parse(msg.data);
              } catch (e) {
                // keep as string
              }
            }

            console.log('Response from websocket:', { topic: msg.topic, data: parsedData });

            if (msg.topic === 'important') {
              this.importantEvent.emit(msg.data);
            }
      }
    });
  }
}

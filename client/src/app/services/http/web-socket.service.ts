import { Injectable } from "@angular/core";
import { NEVER, Observable, Observer } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UrlHandlingStrategy } from "@angular/router";

 
export interface Message {
    topic: string;
    data: string;
}

@Injectable({  providedIn: 'root'})
export class WebsocketService {
    private subject: AnonymousSubject<MessageEvent> = new AnonymousSubject<MessageEvent>();
    messages: Subject<Message> =  {} as Subject<Message>;

    
    init(url: string) {
        this.messages = <Subject<Message>>this.connect(url).pipe(
            map(
                (response: MessageEvent): Message => {
                    let data = JSON.parse(response.data)
                    return data;
                }
            )
        );
    }

    connect(url: string): AnonymousSubject<MessageEvent> {
        
        this.subject = this.create(url);
        console.log("Successfully connected: " + url);
         
        return this.subject;
    }

    private create(url:string): AnonymousSubject<MessageEvent> {
        let ws = new WebSocket(url);
        let observable = new Observable((obs: Observer<MessageEvent>) => {
            ws.onmessage = obs.next.bind(obs);
            ws.onerror = obs.error.bind(obs);
            ws.onclose = obs.complete.bind(obs);
            return ws.close.bind(ws);
        });
        let observer = {
            error: null,
            complete: null,
            next: (data: Object) => {
                //console.log('Message sent to websocket: ', data);
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            }
        };
        return new AnonymousSubject<MessageEvent>(observer as any, observable);
    }
}
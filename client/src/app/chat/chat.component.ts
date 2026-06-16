import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { RandomColorPipe } from '../pipes/random-color.pipe';
import { MessageService } from '../services/http/message.service';
import { ChatMessagePipe } from '../pipes/chat-message.pipe';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports:[  
    CommonModule,
    FormsModule, 
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    RandomColorPipe,
    ChatMessagePipe  ] 
})
export class ChatComponent implements OnInit , AfterViewInit{
 
  num = 0;
  open = false;
  input = '';
  messages = [{ text: 'שלום! איך אפשר לעזור לך?', sender: '' }];
  private messagService = inject(MessageService);

  ngOnInit(): void {
    this.num =    Math.random();
  }

   ngAfterViewInit(): void {
  
  }

  send() {
    if (!this.input.trim()) return;
    const details = localStorage.getItem('user');
    let userName = '';
    if(details){
      userName = JSON.parse(details).userName;
    }
    this.messagService.sendMessage$(userName,this.input ).subscribe(); 
    this.input = '';
  }
  addMessage(userName:string, message: string){
     this.messages.push({ text: message, sender: userName });
     this.updateStyle();
  }

  updateStyle(){
     let elements = document.getElementsByClassName("chat-message"); 
     for(let  el of elements){
          el.innerHTML = (el.textContent || '').replace(/&&\s*(.*?)\s*&&/, '<span class="bold">$1</span>');
     }
  }
  openChat(){
     this.num =    Math.random();
     this.open= true;
  }
  closeChat(){
     this.open= false;
  }

  

}

import { Component } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { TasksComponent } from '../tasks/tasks.component';
import { TasksDashboardComponent } from '../tasks-dashboard/tasks-dashboard.component';
import { TasksTableComponent } from '../tasks-table/tasks-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskViewMode } from '../Model/taskviewmode';
import { appoverhighlight } from '../directive/appoverhilight.directive';
import {  ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { RouterModule , RouterLink, RouterOutlet, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription, tap } from 'rxjs';
import { CheckHttpService } from '../services/http/check-http.service';
import { NavbarService } from '../services/navbar.service';
import { UserComponent } from '../user/user.component';
import { ChatComponent } from '../chat/chat.component';


@Component({
  selector: 'app-main',
  imports: [TasksComponent,CommonModule,FormsModule,MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    RouterModule,
    CommonModule, 
    RouterLink,
    CommonModule,
    FormsModule,
    RouterOutlet,
    UserComponent,
    ChatComponent
  ],


    
    

    
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})








export class MainComponent implements OnInit{

//   buttons:any=[{
  
// value:"addTask",
//   name:"להוספת משימה"
// },
// {
//   value:"return",
//   name:"לחזרה לבית"
// },
// {
//   value:"about",
//   name:"אודות"
// },

// ]
  navbarService = inject(NavbarService);
  connection = inject(CheckHttpService);
  isServerAlive: boolean | null = null;
  router = inject(Router);
  @ViewChild('about') targetElement!: ElementRef;
  buttons: any;
  dataSubscription: Subscription | undefined;


  // ngOnInit(): void {
  //   this.checkServer();
  //   setInterval(() => {
  //     this.checkServer();
  //   }, 2000);
  // }


   ngOnInit(): void {
    
    this.dataSubscription = this.navbarService.nav$.subscribe(data => {
      this.buttons = data.buttons;
    });
    setInterval(() => {
      this.connection.check$().pipe(
        tap((result) => this.isServerAlive = !!result)
        ).subscribe(
          (_=>{}),
          (err => {})
        );
    }, 2000);
   
   this.goToComponent('tasks');
  }

   changeUser(){
    localStorage.setItem('user','');
    this.router.navigate(['/login']);
  }
goToComponent(child: string) {
    if(child==='home'){
      this.router.navigate(['/']);
      return
    }
   
    const path = this.navbarService.getCurrentNavbar('main', child);
    this.router.navigate([path]);
  }
navigate(child: string): void {
    this.goToComponent(child);
  }
   private checkServer(): void {
     this.connection.check$().subscribe(
       (result) => {
         this.isServerAlive = !!result;
       },
      (err) => {
         console.error('checkConnection failed:', err);
         this.isServerAlive = false;
       }
     );
   }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TasksDashboardComponent } from './tasks-dashboard/tasks-dashboard.component';
import { appoverhighlight } from './directive/appoverhilight.directive';
import { HebrewPipe } from './pipes/hebrew.pipe';
import { TaskComponent } from './task/task.component';
import { FormsModule } from '@angular/forms';
import { FilterstatusPipe } from './pipes/filterstatus.pipe';
import { TasksComponent } from './tasks/tasks.component';
import { MainComponent } from './main/main.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { ChatComponent } from './chat/chat.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports :[
    CommonModule,
    RouterModule,
  ] 
})
export class AppComponent {
  title = 'Aidyproject';
  
}

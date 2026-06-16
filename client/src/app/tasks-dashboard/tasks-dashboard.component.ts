import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';
import { Itask } from '../Model/itask';
import { statusEnum } from '../Model/statuasEnum';
import { appoverhighlight } from '../directive/appoverhilight.directive';
import { HebrewPipe } from '../pipes/hebrew.pipe';
import { TaskComponent } from '../task/task.component';
import { FilterstatusPipe } from '../pipes/filterstatus.pipe';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { StatusiconPipe } from '../pipes/statusicon.pipe';

@Component({
  standalone: true,
  selector: 'app-tasks-dashboard',
  imports: [CommonModule,
    TaskComponent,
    FormsModule,MatIconModule,
    StatusiconPipe],
  templateUrl: './tasks-dashboard.component.html',
  styleUrl: './tasks-dashboard.component.scss'
})
export class TasksDashboardComponent {
    @Input()taskslist:Itask[]=[];
    theStatusEnum=statusEnum
  
      }
  
    


  


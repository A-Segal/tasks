
import { AfterViewInit, Component , inject, OnInit} from '@angular/core';
import {Itask} from '../Model/itask';
import { statusEnum} from '../Model/statuasEnum';
import { HebrewPipe } from '../pipes/hebrew.pipe';
import { TasksDashboardComponent } from '../tasks-dashboard/tasks-dashboard.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterstatusPipe } from '../pipes/filterstatus.pipe';
import { TaskViewMode } from '../Model/taskviewmode';
import {TasksTableComponent} from '../tasks-table/tasks-table.component'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {TaskFormComponent} from '../task-form/task-form.component'
import { ConfigurationService } from '../services/configuration.service';
import { TasksService } from '../services/http/tasks.service';
import { map,NEVER, Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-tasks',
  imports: [
    HebrewPipe,
    TasksTableComponent,
    TasksDashboardComponent,
    CommonModule,
    FormsModule,
    FilterstatusPipe
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit, AfterViewInit {

private dialog = inject(MatDialog)
private dialogRef: MatDialogRef<TaskFormComponent> | null = null
private configurationService = inject(ConfigurationService);
tasksService = inject(TasksService); 
selectEnum=3;
viewState=TaskViewMode.Dashboard
theStateEnum=TaskViewMode
theStatusEnum=statusEnum
selectedstatus = statusEnum.all;
errorSrc = '/error.jpg';
errorMessage = `Server error.`;
importantMessageDate = '';
TasksThatEnd : string[] =[];
tasksList$ :Observable<Itask[]> = NEVER;

 statusList = Object.keys(statusEnum)
    .filter(key => isNaN(Number(key)))
    .map(key => ({
      value:statusEnum[key as keyof typeof statusEnum]
    }));
  
     ngOnInit(): void {
 
  }

  
  ngAfterViewInit(): void {
   this.loadTasks();
  //  this.configurationService.messageEvent.subscribe(
  //     (data: string) => this.showMessage(JSON.parse(data)));
  //   this.configurationService.importantEvent.subscribe(
  //       (data: string) => this.showImportantMessage(JSON.parse(data)));
  // }
  

  // showMessage(userMessage: {userName:string, message: string}){
  //   const {userName, message} = userMessage
  //   this.myChatRef.addMessage(userName ,  `💬 ${ message}`);
  // }

  // showImportantMessage(serverMessage:{name: string, date:string}){
  //   if(!this.myChatRef){
  //     return;
  //   }
  //   const {name, date} = serverMessage;
  //   if(date !== this.importantMessageDate){
  //     this.TasksThatEnd = [];
  //     this.importantMessageDate = date;
  //   }
  //   if(!this.TasksThatEnd.includes(name)){
  //     this.TasksThatEnd= [...this.TasksThatEnd, name];
  //     this.myChatRef.addMessage('מנהל המשימות',`💥משימה && ${name} && חייבת להסתיים היום!`);
  //   }

  }
  loadTasks(){
     this.tasksList$ = this.tasksService.getTasks$().pipe(
      map(tasks => tasks || []), 
    );
  }


changeState(){

this.viewState = this.viewState === TaskViewMode.Table ? TaskViewMode.Dashboard : TaskViewMode.Table
}
addTask(){
   this.dialogRef = this.dialog.open(TaskFormComponent,{
    width: ' 50vw ',
    disableClose:false,
    data: {task : null}
   })
   this.dialogRef.afterClosed().subscribe(result => {
    if (result?.success) {
      this.loadTasks();
    }
    this.dialogRef = null;
   })
}

}













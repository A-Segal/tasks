import { Component ,EventEmitter,inject,Input, Output, SimpleChanges} from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { CommonModule } from '@angular/common';
import { Itask } from '../Model/itask';
import { HebrewPipe } from '../pipes/hebrew.pipe';
import { appoverhighlight } from '../directive/appoverhilight.directive';
import{ MatTableModule}from '@angular/material/table'
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { tap } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { TasksService } from '../services/http/tasks.service';
import { SnackService } from '../services/snack.service';

@Component({
  standalone: true,
  selector: 'app-tasks-table',
  imports: [CommonModule,HebrewPipe,appoverhighlight,MatTableModule,MatIcon],
    
  templateUrl: './tasks-table.component.html',
  styleUrl: './tasks-table.component.scss'
})
export class TasksTableComponent {
@Input()taskslist:Itask[]=[];
  @Output() afterUpdate: EventEmitter<any>  = new EventEmitter ();
   private confirmRef: MatDialogRef<ConfirmDialogComponent> | null = null;
   private tasksService = inject(TasksService); 
   private snack = inject(SnackService);

private dialog = inject(MatDialog);
private dialogRef: MatDialogRef<TaskFormComponent> | null = null;
notDisplayColumns = ['taskId'];
   iconColumns = ['delete','status','update'];

columns:string[]=[]


ngOnInit(): void {
   }

  ngOnChanges(changes: SimpleChanges): void {
     const { taskslist }= changes;
     if(taskslist){
      if(this.taskslist && this.taskslist.length){
              this.columns =[... Object.keys(this.taskslist[0])
              .filter( key => !this.notDisplayColumns.includes(key) ), 
              'update', 'delete'];
        }
     }
  }


deleteTask({ taskId }: Itask){
    this.confirmRef = this.dialog.open(ConfirmDialogComponent, {
      width: '220px',
      disableClose: false,
        data: { message: 'האם אתה בטוח שאתה רוצה למחוק את המשימה?'}
    });

    this.confirmRef.afterClosed().subscribe(result => {
      console.log('Dialog closed', result);
      if(result){
          this.deleteTaskFromList(taskId);
      } 
      
    });
  }
   deleteTaskFromList(taskId: number){
      this.tasksService.deleteTask$(taskId).pipe(
            tap((result) => this.snack.openSnackBar('מחיקה הסתיימה בהצלחה','')),
            tap(_ => this.afterUpdate.emit()),
            tap(_ => this.confirmRef = null )// אחרי הסגירה מאפסים את ההפניה
          ).subscribe(
            (_=>{}),
            (err => this.snack.openSnackBar('שגיאה במחיקת משימה',err))
        );  
  }
updateTask(task:Itask){
   
    this.dialogRef = this.dialog.open(TaskFormComponent, {
      width: '520px',
      disableClose: false,
        data: { task }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed', result);
      if (result?.success) {
        this.afterUpdate.emit();
      }
      this.dialogRef = null; // אחרי הסגירה מאפסים את ההפניה

    });
  }

}





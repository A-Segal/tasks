


import { Component, Inject, inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { statusEnum } from '../Model/statuasEnum';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StatusComponent } from '../status/status.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {Itask } from '../Model/itask';
import { TasksService } from '../services/http/tasks.service';
import { tap } from 'rxjs';
import { SnackService } from '../services/snack.service';

@Component({
  standalone: true,
  selector: 'app-task-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StatusComponent,
    MatFormFieldModule,
    MatInputModule, 
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit{
  private fb = inject(FormBuilder); 
  private tasksService = inject(TasksService); 
  private snack = inject(SnackService);
  taskForm: FormGroup = {} as FormGroup;
  statusModes = Object.values(statusEnum);
  readonly startDate = new Date();
  isNew = true;
 @Input()  task :Itask = {} as Itask;
  
  
  constructor(
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
   
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [50, [Validators.required, Validators.min(50)]],
      scheduling: [new FormControl<Date | null>(null), this.dateFromTodayValidator()],
      status:  [statusEnum.pending, ], 
    });
     this.task = this.data.task;
     if(this.task){
       const { taskId, ...taskWithoutId } = this.task;
       this.taskForm.setValue(taskWithoutId);
     }
   
     this.isNew = !this.task || Object.keys(this.task).length ===0;
  }
  
  dateFromTodayValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const inputDate = new Date(value);
      const today = new Date();

      // מאפסים שעות כדי להשוות רק תאריכים
      today.setHours(0, 0, 0, 0);
      inputDate.setHours(0, 0, 0, 0);

      return inputDate >= today ? null : { dateFromToday: { minDate: today, actual: inputDate } };
    };
  }

  buttonText(){
     return this.isNew?'שמור':'עדכן';
  }       

  removeTime(date: Date): Date {
    const theDate  = new Date(date)
    return new Date(Date.UTC(
      theDate.getFullYear(),
      theDate.getMonth(),
      theDate.getDate()
    ));
  } 


  save() {
    if (this.taskForm.valid) { 
      const task = this.taskForm.value;
      task.scheduling = this.removeTime(task.scheduling);
     if(this.isNew){
         this.tasksService.addTask$(task).pipe(
          tap((result) =>  this.dialogRef.close({ success: true })
        )
        ).subscribe(
          (_=>{}),
          (err => this.snack.openSnackBar('שגיאה בהוספת משימה',err))
        );  
     } else{
        task.taskId = this.task.taskId;
        this.tasksService.updateTask$(task).pipe(
          tap((result) =>  this.dialogRef.close({ success: true })
        )
        ).subscribe(
          (_=>{}),
          (err => this.snack.openSnackBar('שגיאה בעדכון משימה',err))
        );  
     }
      
     
    }
  }

  cancel(){
      this.dialogRef.close({ success: false });
  }

  
}

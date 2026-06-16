import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Itask } from '../Model/itask';
import { HebrewPipe } from '../pipes/hebrew.pipe';
import { appoverhighlight } from '../directive/appoverhilight.directive';
import { FormsModule } from '@angular/forms';
import { FilterstatusPipe } from '../pipes/filterstatus.pipe';
import { StatusiconPipe } from '../pipes/statusicon.pipe';
import{MatIconModule}from '@angular/material/icon'
@Component({
  standalone: true,
  selector: 'app-task',
  imports: [CommonModule,HebrewPipe,appoverhighlight,FormsModule,MatIconModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input()task:Itask={} as Itask;
   

  }


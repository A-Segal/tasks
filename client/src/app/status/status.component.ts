import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { statusEnum } from '../Model/statuasEnum';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  standalone: true,
  selector: 'app-status',
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
   providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: StatusComponent,
      multi: true
    },
  ]
})
export class StatusComponent implements ControlValueAccessor {
  theStatusEnum = statusEnum;
  private _status = statusEnum.pending;
  @Input() canChangeStatus: boolean = false;
   get status() {
     return this._status;
   }
 
   @Input() set status(val) {
      this._status = val;
      this.propagateChange( this._status);
   }

   statusToString(status:statusEnum){
      switch(status){
        case statusEnum.pending:
          return 'ממתין';
          case statusEnum.process:
          return 'בתהליך';
          case statusEnum.completed:
          return 'בוצע';
          case statusEnum.cancel:
          return 'בוטל';
          default:return '';
      }
   }
   propagateChange = (_: any) => {};

   changeStatus(status: statusEnum) {
    if(this.canChangeStatus){
            this.status = status;
    }
    
   }
  
 
     //  מתודה שכותבת ערך חדש ממודל הטופס לתצוגה או (אם יש צורך) במאפיין DOM
    writeValue(value: any): void {
     if (!value) {
       this.status = statusEnum.pending;
       return;
      }
      this.status = value;
    }
 
    // מקבלת פונקציה שמתבצעת לאחר שנעשה שינוי בערך של הפקד
    registerOnChange(fn: any): void {
       this.propagateChange = fn;
    }
 
    // מקבלת פונקציה שמתבצעת לאחר שנעשה שינוי בערך של הפקד שנעשה ע"י מגע(במסך מגע)
    registerOnTouched(fn: any): void {
    }
 
    setDisabledState?(isDisabled: boolean): void {
     // this.disabled = isDisabled;
    }
}

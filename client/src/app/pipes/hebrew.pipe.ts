import { Pipe, PipeTransform } from '@angular/core';
import { statusEnum } from '../Model/statuasEnum';

@Pipe({
  name: 'hebrew'
})
export class HebrewPipe implements PipeTransform {

  transform(value: statusEnum): string {
    switch(value){
      case statusEnum.all:
       return "הכל"
      case statusEnum.pending:
        return "מחכה"
      case statusEnum.process:
        return "בתהליך"
      case statusEnum.completed:
        return "הושלם"  
      case statusEnum.cancel:
        return "בוטל"  
      
    }
    return ""
  }

}

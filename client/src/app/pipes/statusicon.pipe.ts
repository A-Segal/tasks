import { Pipe, PipeTransform } from '@angular/core';
import { statusEnum } from '../Model/statuasEnum';

@Pipe({
  name: 'statusicon'
})
export class StatusiconPipe implements PipeTransform {

  transform(status:statusEnum): string {
   switch (status) {
      case statusEnum.pending:
        return 'hourglass_empty';
      case statusEnum.process:
        return 'hourglass_top';
      case statusEnum.completed:
        return 'check';
      case statusEnum.cancel:
        return 'cancel';
    }
    return '';
  }

}

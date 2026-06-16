import { Pipe, PipeTransform } from '@angular/core';
import { Itask } from '../Model/itask';
import { statusEnum } from '../Model/statuasEnum';

@Pipe({
  name: 'filterstatus'
})
export class FilterstatusPipe implements PipeTransform {

  transform( task: Itask[],status: statusEnum): Itask[] {
     if(!task.length||!task||status==statusEnum.all){
      return task
     }
     return task.filter(x=>x.status==status);
  }

}

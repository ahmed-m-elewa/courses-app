import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: any, type?: any): any {
    return type === 'date' ? moment(value).format('DD/MM/YYYY') : moment(value).format('DD/MM/YYYY HH:mm:ss');
  }

}

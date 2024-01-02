import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateTimeRange',
  pure: true,
})
export class DateTimeRangePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) { }

  transform(dateRange: string, connector: string = ' -> '): string {
    return dateRange
      .split(' ')
      .map((date) => this.datePipe.transform(new Date(date), 'dd/MM/yyyy HH:mm') || '')
      .join(connector);
  }
}

import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(values: any, filterBy: string) {
    return values.filter(value => value.name.indexOf(filterBy) !== -1); 
  }
}

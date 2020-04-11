import { Pipe, PipeTransform } from '@angular/core';
import { VirtualTimeScheduler } from 'rxjs';

@Pipe({
  name: 'sort',
  pure:false
})
export class SortPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
   return value.sort(this.compareTo);
  }
  compareTo(a,b)
  {
    var compare=0;
    var aa=a.name.toUpperCase();
    
    var bb=b.name.toUpperCase();

    
    if(bb>aa)
    {
      compare=1;
    }
    if(aa>bb)
    {
      compare=-1;
    }
    return -compare;
  }
}

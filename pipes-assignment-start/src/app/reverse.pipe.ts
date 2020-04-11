import { PipeTransform, PipeDecorator, Pipe } from '@angular/core';


@Pipe({
    'name':'reverse'
})

export class ReversePipe implements PipeTransform{

    transform(value)
    {
        var temp=value.split("");
        temp= temp.reverse();
        return temp.join("");
    }
}
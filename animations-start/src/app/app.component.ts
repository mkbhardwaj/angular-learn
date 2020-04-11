import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

//animation will be provide in the component deifinition, with a array of trigger 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations:[trigger('divState',[state('normal',style({'background-color':'red',transform:'translateX(0)'
})),state('highlighted',style({'background-color':'yellow',transform:'translateX(100px)'
})),transition('normal=>highlighted',animate(300)),transition('highlighted=>normal',animate(800))
])]
})
export class AppComponent {
  state='normal';
  list = ['Milk', 'Sugar', 'Bread'];

    onAdd(item) {
      this.list.push(item);
    }
    onChange()
    {
      this.state=this.state==='normal'?'highlighted':'normal';
    }
}

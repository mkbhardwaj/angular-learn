import { 
  Component, 
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
  } from '@angular/core';

@Component({
  selector: 'app-manage-console',
  templateUrl: './manage-console.component.html',
  styleUrls: ['./manage-console.component.css']
})
export class ManageConsoleComponent implements OnInit {
  newServerName="";
  newServerContent="";
  // we can create a event emitter and allow it to be handled from outside by decorating it 
  // with output 
  @Output('srCreated') serverCreated =new EventEmitter<{type:string,name:string,content:string}>();
  @Output('bpCreated') blueprintCreated=new EventEmitter<{type:string,name:string,content:string}>();
  // another method to access local ref in the component is viewchild 
  @ViewChild('serverInput') serverInput:ElementRef;
  constructor() { }

  ngOnInit(): void {
  }
  onAddServer(serverInput:HTMLInputElement){
    
     this.serverCreated.emit({name:serverInput.value,type:'server',content:this.newServerContent});
  }

  onAddBlueprint(){
    
    this.blueprintCreated.emit({name:this.serverInput.nativeElement.value,type:'blueprint',content:this.newServerContent});
  }
}

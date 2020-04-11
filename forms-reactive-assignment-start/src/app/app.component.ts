import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  fGroup:FormGroup;
ngOnInit(){
this.fGroup=new FormGroup({
  'projectname':new FormControl(null,this.customValidator,this.customAsynValidator),
  'email':new FormControl(null),
  'status':new FormControl(null)
});
}
onSubmit(){
  console.log(this.fGroup.value.projectname+":"+this.fGroup.value.email+":"+this.fGroup.value.status);
}

customValidator(control:FormControl):{[s:string]:boolean}{
if(control.value==='Test'){
return {'projectnameforbidden':true};
}
else{
return null;
}
}

customAsynValidator(control:FormControl):Promise<any>|Observable<any>{
 var p= new Promise<any>((resolve,reject)=>{
   setTimeout(()=>{
     if(control.value==='Test2'){
       resolve({'projectforbidden':true});
     }else{
       resolve(null);
     }
   } ,1500)

 });
 return p;
}

}



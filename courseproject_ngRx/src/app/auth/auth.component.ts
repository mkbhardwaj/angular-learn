import { Component, OnInit, ViewChild, ComponentFactory, ComponentFactoryResolver, Directive, ComponentRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder.directive';
import * as fromApp from '../store/app.reduces';
import { Store } from '@ngrx/store';
import * as authActions from './store/auth.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit,OnDestroy {
  
  public authMode: string = "Login";
  loading = false;
  error: string = null;
  @ViewChild('authForm') authForm: NgForm;
  @ViewChild(PlaceHolderDirective) alertHost: PlaceHolderDirective;
  private closeSub: Subscription;
  constructor(private authService: AuthService, private router: Router,
     private componentFactoryResolver: ComponentFactoryResolver,private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {
   this.closeSub= this.store.select('auth').subscribe(state=>{
      this.loading=state.loading;
      if(state.authError){
        this.showError(state.authError);
      }
});
  }
  changeAuthMode() {
    this.authMode = this.authMode == "Login" ? "Register" : "Login";
  }
  authenticate() {

    console.log(this.authForm.value.email + '|' + this.authForm.value.password);
    if (this.authMode == 'Login') {
      this.loading = true;
      this.store.dispatch(new authActions.StartLoginAction({email:this.authForm.value.email,password:this.authForm.value.password}));
      //this.authOps = this.authService.signin(this.authForm.value.email, this.authForm.value.password);
    } else {
      this.loading = true;
      this.store.dispatch(new authActions.SignUpStart({email:this.authForm.value.email,password:this.authForm.value.password}));
      // this.authOps = this.authService.signup(this.authForm.value.email, this.authForm.value.password);
    }
   
    // this.authOps.subscribe(resData => {
    //   console.log(resData);
    //   this.router.navigate(['/recipes']);
    //   this.loading = false;
    // }, error => {
    //   this.error = error;
    //   this.loading = false;
    //   this.showError(error);
    // })
  }

  showError(error) {
    let alertComponentFactory: ComponentFactory<AlertComponent> = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    let alertCompRef= this.alertHost.viewContainerRef.createComponent(alertComponentFactory);
    alertCompRef.instance.message=error; // set the value of ipnut property
    this.closeSub= alertCompRef.instance.close.subscribe(()=>{
      alertCompRef.instance.close.unsubscribe(); // unsubscribe the event
      this.alertHost.viewContainerRef.clear(); // remove the element
    });


  }
  ngOnDestroy(){
    if(this.closeSub)
    {
      this.closeSub.unsubscribe();
    }
  }
}

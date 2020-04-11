import {
    Component,
    Output,
    EventEmitter,
    OnInit
} from '@angular/core';

import { DataServicesService } from '../shared/data-services.service';
import { AuthService } from '../auth/auth.service';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: []
})
export class HeaderComponent implements OnInit {
    isAuthenticated:boolean=false;
    // output variable to emit event.
    ngOnInit(){
        this.authService.userSubject.subscribe(user=>{
        
        if(user)
        {
           this.isAuthenticated=!!user.token;
        }else{
            this.isAuthenticated=false;
        }
        });
    }
    constructor(private dataService: DataServicesService,private authService:AuthService) { }
    saveData() {
        this.dataService.storeRecipes();
    }
    fetchData() {
        this.dataService.fetchRecipes().subscribe(recipes=>{
            console.log(recipes);
        });
    }
    logout(){
        this.authService.logOut();
    }
}
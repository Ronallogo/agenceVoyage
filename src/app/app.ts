import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
 





 
import {AuthenticationService} from "./service/authentication.service";

 
import {ApplicationService} from "./service/application.service";
import {LoadingComponent} from "./components/loading/loading.component";
 


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingComponent],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class AppComponent  implements OnInit{
  protected loading  : boolean = true ;

  title = 'agenceVoyage';



  protected userViews  : string = "" ;

  protected user !: any ;

  constructor(protected service :   ApplicationService  ,  protected auth : AuthenticationService , protected router : Router) {
  }




  ngOnInit(): void {


    setTimeout(()=>{
        this.loading = true ;
    } , 2000) ;



  }






}

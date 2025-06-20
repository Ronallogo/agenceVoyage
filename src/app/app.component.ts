import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {DOCUMENT, NgIf} from '@angular/common';





import {NavBarComponent} from "./layout/nav-bar/nav-bar.component";
import {SidebarComponent} from "./layout/sidebar/sidebar.component";
import {BodyApplicationComponent} from "./layout/body-application/body-application.component";
import {AuthenticationService} from "./service/authentication.service";


import {user, Voyage} from '../model/interfaces';
import { HomeComponent } from "./components/home/home.component";
import { FooterComponent } from './layout/footer/footer.component';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import {ApplicationService} from "./service/application.service";
import {LoadingComponent} from "./components/loading/loading.component";
import {forkJoin} from "rxjs";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{
  protected loading  : boolean = true ;

  title = 'agenceVoyage';
  private roles  : string[] = ["CLIENT" , "AGENT" , "ADMIN"] ;
  private _user !:user ;
  private objJwt !: any ;
  private response! :any ;




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

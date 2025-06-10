import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DOCUMENT } from '@angular/common';





import {NavBarComponent} from "./layout/nav-bar/nav-bar.component";
import {SidebarComponent} from "./layout/sidebar/sidebar.component";
import {BodyApplicationComponent} from "./layout/body-application/body-application.component";
import {AuthenticationService} from "./service/authentication.service";


import { user } from '../model/interfaces';
import { HomeComponent } from "./components/home/home.component";
import { FooterComponent } from './layout/footer/footer.component';
import { AgentLayoutComponent } from './layout/agent-layout/agent-layout.component';


@Component({
  selector: 'app-root',
  imports: [  AgentLayoutComponent ,  RouterOutlet , SidebarComponent, NavBarComponent, BodyApplicationComponent , HomeComponent , FooterComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{
  title = 'agenceVoyage';
  private roles  : string[] = ["CLIENT" , "AGENT" , "ADMIN"] ;
  private _user !:user ;
  private objJwt !: any ;
  private response! :any ;


  protected userViews  : string = "" ;

  protected user !: any ;

  constructor(protected auth : AuthenticationService , protected router : Router) {
  }




  ngOnInit(): void {
   try{
      this.user  =  JSON.parse(String(localStorage.getItem("user"))) ;
   }catch(err){
      this.user = undefined ;

   }


  }



}

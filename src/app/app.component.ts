import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DOCUMENT } from '@angular/common';




import {NavBarComponent} from "./layout/nav-bar/nav-bar.component";
import {SidebarComponent} from "./layout/sidebar/sidebar.component";
import {BodyApplicationComponent} from "./layout/body-application/body-application.component";

@Component({
  selector: 'app-root',
  imports: [SidebarComponent, NavBarComponent, BodyApplicationComponent ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{

  protected userViews  : string = "" ; 

  protected user : string = "";

  


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  title = 'agenceVoyage';



}

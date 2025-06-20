import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../layout/footer/footer.component';
import { LoginComponent } from "../login/login.component";
import { user } from '../../../model/interfaces';

@Component({
  selector: 'app-home',
  imports: [FooterComponent , RouterOutlet, RouterLink, RouterLinkActive],
  standalone : true ,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit{
  protected views !: string  ;
  view: any;
  protected _user! :  any ;

  ngOnInit(): void {
      this.view = "home" ;

  }
  changeViews(view : string){
    this.view = view ;
  }

}

import { Component } from '@angular/core';
import {NgClass} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import { VIEW } from '../../../model/interfaces';
import { _makeSure } from '../../notification/notification';

@Component({
  selector: 'app-sidebar',
  imports: [
    NgClass,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  protected isSidebarOpen: boolean = true;
  protected isSelected : boolean = false ;
   protected VIEWS :   VIEW[] = [
     {name : "dashboard" ,isSelected : false  } , // 0
     {name : "voyage" ,isSelected : false } ,  // 1
     {name : "client" ,isSelected : false } ,//2
     {name : "agent" , isSelected : false}  , // 3
     {name : "reservation" ,isSelected : false } , // 4
     {name : "billet" ,isSelected : false } , // 5
     {name : "paiement" ,isSelected : false } , // 6
     {name : "logout" , isSelected : true } ,//7
     {name : "profile"  , isSelected : true}// 8



  ] ;

  constructor(protected router  : Router){}


 /* constructor(protected sp : ServicePrincipal) {
  }*/

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen
  }



  ngOnInit(): void {
  }

 selectedView(id: string | undefined) {
  if (!id) return false;

  this.VIEWS.forEach(view => {
    view.isSelected = view.name === id;
  });

  return true;
  }
  async logout(){
    let response=  await _makeSure("Voulez-vous vous déconnecter?") ;
    if(!response) return ;

    localStorage.setItem("user" ,  String(undefined)) ;
    this.router.navigate(['/home/first-sight']) ;




  }






}

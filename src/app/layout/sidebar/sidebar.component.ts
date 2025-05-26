import { Component } from '@angular/core';
import {NgClass} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import { VIEW } from '../../../model/interfaces';

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
     {name : "dashboard" ,isSelected : false } , // 0 
     {name : "voyage" ,isSelected : false } ,  // 1 
     {name : "client" ,isSelected : false } , // 2 
     {name : "reservation" ,isSelected : false } , // 3 
     {name : "billet" ,isSelected : false } , // 4 
     {name : "paiement" ,isSelected : false } , // 5 
     {name : "logout" , isSelected : true } , // 6


  ] ; 


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


  

 

}

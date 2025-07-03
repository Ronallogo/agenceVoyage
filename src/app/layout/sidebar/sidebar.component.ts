import {Component, OnInit} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import { VIEW } from '../../../model/interfaces';
import { _makeSure } from '../../notification/notification';
import {ApplicationService} from "../../service/application.service";
import {AuthenticationService} from "../../service/authentication.service";
import {IndexedDbService} from "../../service/indexed-db.service";

@Component({
  selector: 'app-sidebar',
  imports: [
    NgClass,
    RouterLinkActive,
    RouterLink,
   


  ],
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent  implements OnInit{
  protected isSidebarOpen: boolean = true;
  protected isSelected : boolean = false ;
  protected loading : boolean = false ;
  protected role : string = "" ;
  protected VIEWS :   VIEW[] = [
  {name : "dashboard" ,isSelected :  false  , authority :  ["AGENT" , "ADMIN"]  } , // 0
  {name : "voyage" ,isSelected : false , authority :   ["ADMIN" , "AGENT"  ] } ,  // 1
  {name : "client" ,isSelected : false , authority : ["ADMIN" , "AGENT" ] } ,//2
  {name : "agent" , isSelected : false , authority  : ["ADMIN"]}  , // 3
  {name : "reservations" ,isSelected : false  , authority : ["ADMIN"  , "AGENT"]} , // 4
  {name : "billet" ,isSelected : false , authority : ["ADMIN" , "AGENT"] } , // 5
  {name : "paiement" ,isSelected : false , authority : ["ADMIN" ,  "AGENT"] } , // 6
  {name : "logout" , isSelected :  false , authority : ["ADMIN", "CLIENT","AGENT"] } ,//7
  {name : "profile"  , isSelected :  false   , authority:["ADMIN", "CLIENT" , "AGENT"]} , // 8
  {name : "Mes réservations"  , isSelected :  false   , authority:["CLIENT"]},//9
   {name : "Mes paiements" , authority : ["CLIENT"] , isSelected : false} , // 10
    {name : "Voyages disponibles" ,  authority : ["CLIENT"] , isSelected : false}  , //11
    {name : "Mes historiques" ,  authority : ["CLIENT"] , isSelected : false}  , //12
    {name : "historiques" ,  authority : ["ADMIN" , "AGENT"] , isSelected : false}  , //12



  ] ;

  constructor(
    protected service : ApplicationService ,
   protected router  : Router ,
   protected db : IndexedDbService
  ){}




  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen
  }
  getRoleUser(){

    return  this.service.user.roles.at(0).authority ;
  }

  getAuthority(index: number) : boolean {
    let response = false ;
    if(this.service.user !== undefined){
      let auth    =  this.VIEWS.at(index)?.authority ;


      if(auth){
        for (let i = 0; i < auth.length; i++) {
          if(this.getRoleUser() == auth.at(i)){
            response = true ;
          }
        }
      }
    }


    return  response ;
  }



 async ngOnInit(): Promise<void> {

 try {  

    this.service.user = await this.db.getUser();
    setTimeout(()=>{
      this.loading = true ;
  } ,  1000)
 } catch (error) {
    console.log("servser reload!! op : 0") ; 
 }
   console.log(this.service.user) ;
  

 }

 selectedView(id: string | undefined) {
  if (!id) return false;
  this.isSelected = false ;

  this.VIEWS.forEach(view => {
    if(view.name === id){

      this.isSelected = true ;
      view.isSelected = true ;
      this.service.view  = view.name ;
      console.log(view.name) ;
      localStorage.setItem("view" ,view.name) ;

    }else{
      view.isSelected = false ;
      this.isSelected = false ;
    }

  });


  return this.isSelected;
  }



  async logout(){
    let response= await  _makeSure("Voulez-vous vous déconnecter?") ;
    if(!response) return ;

    try {
      await this.db.deleteUser(String(0)) ;
    } catch (error) {
      console.log("server reload!!  op : 1")
      
    }

    await this.router.navigate(['/home/first-sight']) ;




  }






}

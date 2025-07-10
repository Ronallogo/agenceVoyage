import {Component, OnInit} from '@angular/core';
import {TICKETS, VOYAGES} from "../../../../model/data";
import {ApplicationService} from "../../../service/application.service";
import {NgClass} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";


import {FormControl,   FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { _confirmation, _error, _makeSure, _warning } from '../../../notification/notification';
import { Ticket } from '../../../../model/interfaces';
import { Tick } from 'chart.js/dist/core/core.scale';


@Component({
  selector: 'app-ticket',
  imports: [
    NgClass,
    NgxPaginationModule,
    FormsModule ,
    ReactiveFormsModule
  ],
  templateUrl: './ticket.component.html',
  standalone: true,
  styleUrl: './ticket.component.css'
})
export class TicketComponent  implements OnInit{



  research() {
      this.service.researchTicket(this.ticketResearch).subscribe(data=>{
          this.tickets  = data ;

      } , err=> console.log(err)) ;
  }



  protected tickets  :  Ticket[] =  [] ;

  protected currentPage: string | number = 0;
  protected onUpdating : boolean  =   false;
  protected view: boolean = false ;

  protected  ticketResearch  = "" ;

  protected indexedLocation !: number ;



  protected libelle : string = "";

  protected formTicket = new FormGroup({
      libelleTypeBillet : new FormControl("" , [Validators.required , Validators.minLength(4)]) ,
      prixTypeBillet : new FormControl(0 , [Validators.required , Validators.min(25)])
  });



  protected entete : string[] = ["No", "libelle " , "Prix" , "Actions"];
  protected prix:  number=  0 ;



  constructor(protected service : ApplicationService){

  }

  ngOnInit(): void {
    this.listTicket();
  }

  pageChanged($event: number) {
    this.currentPage = $event ;
  }

  create(){
    this.service.createTicket(this.formTicket.getRawValue()).subscribe(data=>{
        _confirmation("billet enregistré avec succès 😊!!!!") ;
        this.listTicket();
    } , err=>{
        _error("Une Erreur s 'est produite") ;
    })
  }



  delete(idVoyage: any) {

  }

  modifier(t:  Ticket) {
    this.onUpdating = !this.onUpdating ;
    t.libelleTypeBillet = this.libelle ;
    t.prixTypeBillet = this.prix ;


     this.service.updateTicket(t).subscribe(data=>{
      this.listTicket();
      _confirmation("mise à jour avec succès!!!");
    },err=>{
      _error("Une Erreur s'est produit");
      console.log(err);
    });


  }



  indexLocationFunction(t: Ticket){
    this.indexedLocation = t.idTypeBillet ;
    this.libelle = t.libelleTypeBillet ;
    this.prix = t.prixTypeBillet;
  }

  listenUpdate(t:  Ticket) {
    this.onUpdating = !this.onUpdating;
    this.libelle = t.libelleTypeBillet ;
    this.prix = t.prixTypeBillet ;


  }

  checkForm():boolean{
    return (

      (this.formTicket.controls.libelleTypeBillet.invalid && this.formTicket.controls.libelleTypeBillet.dirty) ||
      ( this.formTicket.controls.prixTypeBillet.invalid && this.formTicket.controls.prixTypeBillet.dirty)


    );
  }

  listTicket(){
      this.service.listTicket().subscribe(data=>{
        this.tickets = data ;
      } , error=>{
          _warning("Server not reachable !!! ")
      })
  }

  cancelUpdate() {
    this.onUpdating = !this.onUpdating;
  }

  async deleteClient(idTicket: any) {
    let reponse = await _makeSure("voulez-vous ")
    if(!reponse) return ;
    this.service.deleteTicket(idTicket).subscribe(data=>{
      this.listTicket();
      _confirmation("suppression succès !!!!") ;

    }  , error=>{
        _error("Une Erreur s'est produit");
    });

  }

}

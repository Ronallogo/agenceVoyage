import {Component, OnInit} from '@angular/core';
import {TICKETS, VOYAGES} from "../../../model/data";
import {ApplicationService} from "../../service/application.service";
import {NgClass} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {TypeBillet} from "../../../model/interfaces";
import {tick} from "@angular/core/testing";
import {FormControl, FormControlDirective, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

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

  protected tickets  : TypeBillet[] = TICKETS ;

  protected libelle : string = "";

  protected formTicket = new FormGroup({
      libelleTypeBillet : new FormControl("" , [Validators.required , Validators.maxLength(3)]) , 
      prixTypeBillet : new FormControl("" , [Validators.required , Validators.min(25)])
  });



  protected entete : string[] = ["No", "libelle " , "Prix" , "Actions"];
  protected prix:  number=  0 ;


  constructor(protected service : ApplicationService){

  }

  ngOnInit(): void {
  }

  pageChanged($event: number) {

  }

  delete(idVoyage: any) {

  }

  modifier(t: any) {
    this.onUpdating = !this.onUpdating ;
    t.nom_pays = this.libelle ;
    t.nom_ville = this.prix ;
  }


  protected currentPage!: string | number;
  protected onUpdating : boolean  =   false;
  protected view: boolean = false

  protected indexedLocation !: number

  indexLocationFunction(t:TypeBillet){
    this.indexedLocation = t.idTypeBillet ;
    this.libelle = t.libelleTypeBillet ;
    this.prix = t.prixTypeBillet;
  }

  listenUpdate(t: TypeBillet) {
    this.onUpdating = !this.onUpdating;
    this.libelle = t.libelleTypeBillet ;
    this.prix = t.prixTypeBillet ;
  }
}

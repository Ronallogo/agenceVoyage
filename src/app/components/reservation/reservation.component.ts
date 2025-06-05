import { Component, OnInit } from '@angular/core';

import {NgClass} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {Client_2, Reservation} from "../../../model/interfaces";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { Application } from 'express';
import { ApplicationService } from '../../service/application.service';
import {NgOptionComponent, NgSelectComponent} from "@ng-select/ng-select";

@Component({
  selector: 'app-reservation',
  imports: [
    NgClass,
    NgxPaginationModule,
    FormsModule,
    NgSelectComponent,
    NgOptionComponent,
    ReactiveFormsModule,

  ],
  templateUrl: './reservation.component.html',
  standalone: true,
  styleUrl: './reservation.component.css'
})
export class ReservationComponent  implements OnInit{
listenUpdate(_t69: Reservation) {
throw new Error('Method not implemented.');
}
modifier(_t69: Reservation) {
throw new Error('Method not implemented.');
}
cancelUpdate() {
throw new Error('Method not implemented.');
}

protected onUpdating: boolean = false;
protected indexedLocation: number = 0 ;

protected clients : Client_2[] = [] ;




listClient(){

}




  protected currentPage : number = 0  ;

  protected reservation  = {
    idReservation : ""  ,
    idClient : ""  ,
    idVoyage  :  ""  ,
    idTypeBillet  :  ""  ,
    libelleTypeBillet  :  ""  ,
    libelleVoyage : "",
    nomClient : "" ,
    prenomClient  : "",
    mailClient  : "",
    dateReservation : "" ,
  }

  protected formReservation = new FormGroup({
    nbrPlace : new FormControl() ,
    libelleTypeBillet : new FormControl() ,
    libelleVoyage : new FormControl() ,
    mailClient : new FormControl() , 
   
  });


  protected entete : string[] = ["No" , "Nom du client" , "Mail Client" , "Voyage" , "Type de billet" , "Nombre de place" , "Actions"]

  protected  reservations : Reservation[]  =  [] ;



  ngOnInit(): void {

  }
  constructor(protected service :ApplicationService){

  }

  indexLocationFunction(_t66: Reservation) {

  }

  pageChanged($event: number) {

  }
  deleteReservation(arg0: number) {

  }

}

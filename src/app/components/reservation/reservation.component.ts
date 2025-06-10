import { Component, OnInit } from '@angular/core';

import {NgClass} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {Client_2, Reservation} from "../../../model/interfaces";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

import { ApplicationService } from '../../service/application.service';


@Component({
  selector: 'app-reservation',
  imports: [

    NgxPaginationModule,
    FormsModule,


    ReactiveFormsModule,
    NgClass,

  ],
  templateUrl: './reservation.component.html',
  standalone: true,
  styleUrl: './reservation.component.css'
})
export class ReservationComponent  implements OnInit{


  protected onUpdating: boolean = false;
  protected indexedLocation: number = 0 ;

  protected  reservations :  Reservation[] = [] ;

 






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


  protected entete : string[] = ["No" , "Nom du client" ,"Prénom Client", "Mail Client" , "Voyage" , "Type de billet" , "Nombre de place" , "Actions"]

  



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

  rejected(idTypeBillet: number) {
    
  }
}

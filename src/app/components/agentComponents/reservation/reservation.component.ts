import { Component, OnInit } from '@angular/core';

import {NgClass, NgFor} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {Client_2, Reservation, Ticket, trierListeString} from "../../../../model/interfaces";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

import { ApplicationService } from '../../../service/application.service';
import { forkJoin } from 'rxjs';
import { _confirmation, _makeSure, _warning } from '../../../notification/notification';



@Component({
  selector: 'app-reservation',
  imports: [

    NgxPaginationModule,
    FormsModule,
    NgFor ,


    ReactiveFormsModule,


  ],
  templateUrl: './reservation.component.html',
  standalone: true,
  styleUrl: './reservation.component.css'
})
export class ReservationComponent  implements OnInit{

  protected role : string = "" ;
async supprimerReservation(arg0: number) {

  let response = await _makeSure("Voulez-vous supprimer cette reservation??");

  if(!response) return ;

  this.service.deleteReservation(arg0).subscribe(data => {
    _confirmation("Reservation supprimée avec succès !!!😁");
    this.listReservation() ;

  })
}
  async confirmer(arg0: number) {
    let response = await  _makeSure("Etes vous sure de vouloir confirmer la reservation??") ;
    if(!response) return ;

    let email = this.service.user.email ;
    this.service.confirmation(arg0 , email).subscribe( data=>{
      this.listReservation() ;
       _confirmation("Confirmartion effectuée avec succès") ;
       this.listReservation() ;

    } , err=> console.log(err));
  }




  async annulationReservation(arg0: number) {

      let response = await  _makeSure("Etes vous sure de vouloir annuler la reservation??") ;
      if(!response) return ;
      this.service.annulation(arg0).subscribe(data=>{
          this.listReservation() ;
          _confirmation(" Annulation effectuée avec succès") ;
      } , err=> console.log(err));
  }
  research() {
    if(
      this.reservationResearch.dateReservation == undefined ||
      this.reservationResearch.depart == undefined ||
      this.reservationResearch.arrivee == undefined

    ){
        _warning("Veuillez saisir tous les données pour la recherche") ;
        return ;
    }
     this.service.generalResearchReservation(this.reservationResearch).subscribe(data=>{
            this.reservations = data ;
            console.log(data)

     } , err=> console.log(err)) ;
  }


  protected onUpdating: boolean = false;
  protected indexedLocation: number = 0 ;

  protected  reservations :  Reservation[] = [] ;
  protected reservationResearch =  {
  depart :  "" ,
  arrivee : "" ,
  dateReservation : ""

  }
  villesDepart: string[] = [];
  villesArrivee:  string[] = [];
  protected typesBillet : Ticket[] = [] ;


  getData(){
  forkJoin(
  {



  departs : this.service.allDepartDispo(),
  arrivees : this.service.allArriveDispo()
  }
  ).subscribe(
  {
  next :({

          departs ,
          arrivees

        })=>{


    this.villesDepart = trierListeString(departs as string[]) ;
    this.villesArrivee  = trierListeString(arrivees as string[]) ;

    console.log(this.villesArrivee);

  }})
  }


  listReservation(){
    this.service.allReservation().subscribe(data=>{
      this.reservations = data ;

    } , err=> console.log(err)) ;
  }


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


  protected entete : string[] = [
  "No" , "Nom du client" ,"Prénom Client",
    "Mail Client" , "Voyage" , "Type de billet" ,
    "Nombre de place" , "Actions"]





  ngOnInit(): void {

    this.listReservation() ;

    this.getData() ;

    this.role =   this.service.user.roles.at(0).authority ;

  }

  constructor(protected service :ApplicationService){

  }


}

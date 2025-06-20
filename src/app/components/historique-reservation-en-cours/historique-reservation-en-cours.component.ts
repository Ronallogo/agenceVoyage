import { Component } from '@angular/core';
import {Reservation, Ticket, trierListeString} from "../../../model/interfaces";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ApplicationService} from "../../service/application.service";
import {IndexedDbService} from "../../service/indexed-db.service";
import {forkJoin} from "rxjs";
import {NgForOf} from "@angular/common";
import {_warning} from "../../notification/notification";

@Component({
  selector: 'app-historique-reservation-en-cours',
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './historique-reservation-en-cours.component.html',
  standalone: true,
  styleUrl: './historique-reservation-en-cours.component.css'
})
export class HistoriqueReservationEnCoursComponent {


  protected role : string = "" ;

  protected  typeBillet : Ticket[] = []

  protected reservationResearch = {
    depart : "" ,
    arrivee : "" ,
    dateReservation : "" ,
    mailClient : ""
  }

  protected departs :  string[] = [] ;
  protected arrivees :  string[] = [] ;

  protected  en_cours : Reservation[] =[] ;
  reservationForm = new FormGroup({

  });


  constructor(protected service : ApplicationService , protected db : IndexedDbService){}

  ngOnInit(): void {

    this.role = this.service.user.roles.at(0).authority ;
    console.log(this.role) ;

    this.getData();
  }

  getData( ){
    let email  = this.service.user.email ;
    forkJoin(
      {

        tickets : this.service.listTicket()  ,
        en_cours : this.role == "CLIENT" ? this.service.reservationEnCoursForOne(email) :  this.service.reservationEnCours() ,
        departs : this.service.allDepartDispo(),
        arrivees : this.service.allArriveDispo()
      }
    ).subscribe(
      {
        next :({
                 tickets ,
                 en_cours  ,
                 departs ,
                 arrivees
               })=>{

          this.arrivees = trierListeString(arrivees as string[]) ;
          this.departs = trierListeString(departs as string[]) ;
          this.en_cours = en_cours ;
          this.typeBillet = tickets ;

          console.log( en_cours) ;





        }, error : (err)=> console.log(err) })
  }


  research(){
    this.reservationResearch.mailClient  =  this.service.user.email ;
    if(this.role== "CLIENT"){
      this.service.researchEnCoursForOne({
        ...this.reservationResearch
      }).subscribe(data=>{
        this.en_cours = data ;
      }  , error => {
         _warning("Veuillez saisir une date   !!") ;
      });
    }else{
      this.service.researchEncours({
        ...this.reservationResearch
      }).subscribe(data=>{
        this.en_cours = data ;
      }  , error =>   _warning("Veuillez saisir une date   !!"));
    }

  }


}

import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../service/application.service';
import { IndexedDbService } from '../../service/indexed-db.service';
import { forkJoin } from 'rxjs';
import { Reservation, Ticket, trierListeString } from '../../../model/interfaces';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import {_warning} from "../../notification/notification";

@Component({
  selector: 'app-historique-annulations',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgForOf
  ],
  templateUrl: './historique-annulations.component.html',
  standalone: true,
  styleUrl: './historique-annulations.component.css'
})
export class HistoriqueAnnulationsComponent  implements OnInit{


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

  protected annulees : Reservation[] =[] ;
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
        annulees : this.role == "CLIENT" ? this.service.reservationAnnuleeForOne(email) :  this.service.reservationAnnulee() ,
        departs : this.service.allDepartDispo(),
        arrivees : this.service.allArriveDispo()
      }
    ).subscribe(
      {
        next :({
                tickets ,
                annulees  ,
                departs ,
                arrivees
               })=>{

                this.arrivees = trierListeString(arrivees as string[]) ;
                this.departs = trierListeString(departs as string[]) ;
                this.annulees = annulees ;
                this.typeBillet = tickets ;

                console.log(annulees) ;





        }, error : (err)=> console.log(err) })
  }


research(){
  this.reservationResearch.mailClient  =  this.service.user.email ;
    if(this.role== "CLIENT"){
          this.service.researchAnnuleeForOne({
            ...this.reservationResearch
          }).subscribe(data=>{
            this.annulees = data ;
          }  , error =>  _warning("Veuillez saisir une date   !!"));
    }else{
      this.service.researchAnnulee({
        ...this.reservationResearch
      }).subscribe(data=>{
        this.annulees = data ;
      }  , error =>  _warning("Veuillez saisir une date   !!"));
    }

}





}

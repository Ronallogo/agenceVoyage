import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ApplicationService} from "../../../service/application.service";
import {Paiement, trierListeString} from "../../../../model/interfaces";
import {forkJoin} from "rxjs";
import {_makeSure, _warning} from "../../../notification/notification";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-client-paiement',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './client-paiement.component.html',
  standalone: true,
  styleUrl: './client-paiement.component.css'
})
export class ClientPaiementComponent implements  OnInit{


  protected paiements : Paiement[] =[] ;
  protected reservationResearch =  {
    depart :  "" ,
    arrivee : "" ,
    dateReservation: "" ,
    mailClient : ""

  }

  villesDepart: string[] = [];
  villesArrivee:  string[] = [];

  ngOnInit(): void {
    this.getAllPaiements() ;
    this.getData() ;
  }
  constructor(private service:ApplicationService){

  }

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


  getAllPaiements(){
    this.service.getAllPaiementForOne(this.service.user.email).subscribe(data=>{
      this.paiements = data;
      console.log(data) ;
    } , error => console.log(error));
  }


  async supprimerPaiement(p: Paiement) {
    let response = await _makeSure("Voulez vous supprimer ce paiement?");
    if (!response) return;
    this.service.deletePaiement(p.codePaiement).subscribe(data => {
      this.getAllPaiements();
    }, err => console.log(err));
  }

  researchForOne() {
    this.reservationResearch.mailClient = this.service.user.email
    console.log(this.reservationResearch)
    this.service.researchPaiementForOne({
      depart :  this.reservationResearch.depart ,
      arrivee : this.reservationResearch.arrivee ,
      dateVoyage: this.reservationResearch.dateReservation ,
      mailClient : this.reservationResearch.mailClient

    }).subscribe(data=>{
      this.paiements = data ;
    } , error => _warning(error.error))
  }




}

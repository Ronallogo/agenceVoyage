import {Component, OnInit} from '@angular/core';
import {Paiement, trierListeString} from "../../../../model/interfaces";
import {ApplicationService} from "../../../service/application.service";
import {forkJoin} from "rxjs";
import {NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {_confirmation, _makeSure, _warning} from "../../../notification/notification";

@Component({
  selector: 'app-paiement',
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './paiement.component.html',
  standalone: true,
  styleUrl: './paiement.component.css'
})
export class PaiementComponent  implements OnInit{

  protected paiements : Paiement[] =[] ;
  protected reservationResearch =  {
    depart :  "" ,
    arrivee : "" ,
     dateReservation: ""

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
      this.service.getAllPaiement().subscribe(data=>{
        this.paiements = data;
        console.log(data) ;
      } , error => console.log(error));
  }


  async supprimerPaiement(p: Paiement) {
    let response = await _makeSure("Voulez-vous supprimer ce paiement?");
    if (!response) return;

    this.service.deletePaiement(p.codePaiement).subscribe(data => {
          _confirmation("Paiement supprimer avec succès!!😁😁") ;
    } , err=> console.log(err));

  }

  research() {
      console.log(this.reservationResearch)
      this.service.researchPaiement({
        depart :  this.reservationResearch.depart ,
        arrivee : this.reservationResearch.arrivee ,
         dateVoyage: this.reservationResearch.dateReservation

      }).subscribe(data=>{
          this.paiements = data ;
      } , error => _warning(error.error))
  }





}

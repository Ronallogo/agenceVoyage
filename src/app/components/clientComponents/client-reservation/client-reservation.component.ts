import {Component, OnInit} from '@angular/core';
import {ApplicationService} from "../../../service/application.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Reservation, Ticket, trierListeString, Voyage} from "../../../../model/interfaces";
import {forkJoin} from "rxjs";
import {_confirmation, _warning} from "../../../notification/notification";
import {subscribe} from "node:diagnostics_channel";
import {NgForOf} from "@angular/common";
import {getTodayDate} from "../../../../model/data";

@Component({
  selector: 'app-client-reservation',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgForOf
  ],
  templateUrl: './client-reservation.component.html',
  standalone: true,
  styleUrl: './client-reservation.component.css'
})
export class ClientReservationComponent implements  OnInit{



confirmer(arg0: number) {
throw new Error('Method not implemented.');
}
async payerReservation(r: Reservation) {

  this.service.makePaiement({
    codePaiement: "",
    idReservation: r.idReservation,
    mailAgentAssocie: r.mailAgentAssocie,
    montant: r.montant,
    libelleVoyage: r.depart + " " + r.arrivee,
    libelleTypeBillet: r.libelleTypeBillet,
    datePaiement: getTodayDate()
  }).subscribe(data => {
    console.log(data);

  }, err => console.log(err));
  await _confirmation("Paiement effectué!!");
  setTimeout(()=>{
    this.getMyReservation();
  } , 500);
}

  protected changeSide : boolean = false ;
  reservationForm = new FormGroup({
     voyage : new FormControl() ,
    typeBillet : new FormControl()  ,
    dateReservation : new FormControl()  ,
    nbrPlace : new FormControl()
  });
  voyages: Voyage[] = [];
  typesBillet: Ticket[] =[] ;

  reservations  : Reservation[] = [] ;

  protected reservationResearch =  {
       depart :  "" ,
       arrivee : "" ,
      dateReservation : ""

  }
  villesDepart: string[] = [];
  villesArrivee:  string[] = [];


  constructor(protected service : ApplicationService) {
  }


  ngOnInit(): void {

    this.getData() ;
    console.log(this.voyages) ;
    console.log(this.typesBillet);

    setTimeout(()=>{
      this.getMyReservation()
    } , 1000)




  }

  changeSideFunction(){
    this.changeSide = !this.changeSide ;
  }

  getData(){

    forkJoin(
      {

        voyages : this.service.voyageDisponible(),
        tickets : this.service.listTicket() ,
        departs : this.service.allDepartDispo(),
        arrivees : this.service.allArriveDispo()
      }
    ).subscribe(
      {
        next :({

                 tickets  ,
                 voyages ,
                departs ,
                arrivees
               })=>{
           this.voyages =  voyages ;

          this.villesDepart = trierListeString(departs as string[]) ;
          this.villesArrivee  = trierListeString(arrivees as string[]) ;




          this.typesBillet =  tickets ;

        }}) ;

    this.getMyReservation()
  }

  makeReservation(){
      this.service.makeReservation({
        idVoyage : this.reservationForm.getRawValue().voyage ,
        idTypeBillet : this.reservationForm.getRawValue().typeBillet ,
        nbrPlace : this.reservationForm.getRawValue().nbrPlace ,
        dateReservation : this.reservationForm.getRawValue().dateReservation ,
        mailClient : this.service.user.email
      }).subscribe(data=>{
          console.log(data) ;
           this.getMyReservation() ;
          _confirmation("Votre réservation est en cours d 'analyse !!!😁")
      } , err=>{
          _warning(err.error) ;
          console.log(err);
      })
  }


  getMyReservation(){
    let email = (this.service.user.email == undefined)? ""  : this.service.user.email ; 
    this.service.getMyReservation(email).subscribe(data=>{
    this.reservations = data ;
    console.log(data);

  } , error =>  console.log(error)) ;
  }

  async research() {

    if (
      this.reservationResearch.dateReservation == "" ||
      this.reservationResearch.depart == "" ||
      this.reservationResearch.arrivee == ""
    ) {
      await _warning("Veuillez remplir tous les champs avant la recherche") ;
      return ;
    }
    this.service.researchReservationForOne(this.reservationResearch).subscribe(data => {
      console.log(data);
      this.reservations = data;
    }, err => console.log(err));
  }

  annulationReservation(id : number){
      this.service.annulation(id).subscribe(data=>{
            console.log(data) ;
            _confirmation("Annulation effectuée 😁!!") ;
            this.getData() ;

      } , err=> {
        console.log(err) ;
        _warning(err.error) ;

      }) ;
  }




}

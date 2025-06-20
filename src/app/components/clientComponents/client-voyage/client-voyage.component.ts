import {Component, OnInit} from '@angular/core';
import {ApplicationService} from "../../../service/application.service";
import {Ticket, trierListeString, Voyage} from "../../../../model/interfaces";
import {forkJoin} from "rxjs";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {_confirmation, _warning} from "../../../notification/notification";

@Component({
  selector: 'app-client-voyage',
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './client-voyage.component.html',
  standalone: true,
  styleUrl: './client-voyage.component.css'
})
export class ClientVoyageComponent  implements OnInit{
  departs : string[] = [] ;
  arrivees : string[] = [] ;

  idVoyage : number = -1 ;
  idTypeBillet : number = -1 ;


  protected depart : string = "" ;
  protected  arrivee : string = ""  ;
  protected  dateVoyage : string = "" ;
  protected voyages : Voyage[] = [] ;
  protected  currentDate : number =  new Date().getDate();

  protected  hideFormulaire : boolean  = true ;
  reservationForm = {
    depart :  "",
    arrivee :  "",
    typeBillet : "",
    nbrPlace : 1,
    dateReservation : ""

  }
  typesBillet:  Ticket[] = [];

  constructor(protected service : ApplicationService) {

  }


  ngOnInit(): void {
      this.getData() ;
  }





  getData(){
    forkJoin(
      {

        voyages : this.service.voyageDisponible(),
        tickets  : this.service.listTicket() ,
        departs : this.service.allDepart() , 
        arrivees  : this.service.allArrive()

      }
    ).subscribe(
      {
        next :({
                  tickets ,
                 voyages , 
                 departs , 
                 arrivees 

               })=>{

          this.voyages =  voyages ;
          
          this.typesBillet =  tickets ;

          this.departs = trierListeString(departs as string[]) ;
          this.arrivees  = trierListeString(arrivees as string[]) ; 

        }})
  }


  async research() {
    if (
      this.dateVoyage == "" ||
      this.depart == "" ||
      this.arrivee == ""
    ) {
      await _warning("Veuillez remplir tous les champs avant la recherche");
      return;
    }
    this.service.researhForClient(this.depart, this.arrivee, this.dateVoyage).subscribe(data => {

      this.voyages = data;
    }, error => console.log(error));
  }

  hideFormulaireFunction(){
      this.hideFormulaire = !this.hideFormulaire ;

  }

  goToRegister(t :  Voyage){
    console.log("je suis dans la fonction")
    this.idVoyage = t.idVoyage ;
    this.reservationForm = {
      depart :  t.departVoyage ,
      arrivee :  t.arriveVoyage ,
      typeBillet :  "" ,
      nbrPlace : 1 ,
      dateReservation :  ""
    }



    console.log(this.reservationForm ) ;
    this.hideFormulaireFunction() ;

  }

  makeReservation(){

    this.service.makeReservation({
      idVoyage : this.idVoyage,
      idTypeBillet : this.reservationForm.typeBillet ,
      nbrPlace : this.reservationForm.nbrPlace ,
      dateReservation : this.reservationForm.dateReservation ,
      mailClient : this.service.user.email
    }).subscribe(data=>{
      console.log(data) ;
      this.getData() ;
      _confirmation("Votre réservation est en cours d 'analyse !!!😁")
    } , err=>{
      _warning(err.error) ;
      console.log(err);
    })
  }




}

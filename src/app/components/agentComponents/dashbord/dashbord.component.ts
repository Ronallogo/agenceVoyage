import {ChangeDetectorRef, Component, effect, inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ApplicationService} from "../../../service/application.service";
import {forkJoin} from "rxjs";
import {Client_2, Reservation, Ticket, Voyage} from "../../../../model/interfaces";
import {Tick} from "chart.js/dist/core/core.scale";
import {RouterLink, RouterLinkActive} from "@angular/router";




@Component({
  selector: 'app-dashbord',
  imports: [
    RouterLinkActive,
    RouterLink

  ],
  templateUrl: './dashbord.component.html',
  standalone: true,
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent implements  OnInit{

  dataRes ={
    revenuTotal  :  "" ,
    gainMoyen : ""
  }
  protected gainTotal = "" ; 


  protected recentVoyage : string = "0";
  protected paiementRecent   :  string = "0" ;

  protected resParClient = "" ;
  protected newEarnPourcentage = "0" ; 
  protected nbrVolDispo  = 0 ;

  protected volReserver = 0 ;

  protected voyages : Voyage[] = [] ;
  protected clients : Client_2[] = [] ;
  protected reservation : Reservation[] = [] ;
  protected typesBillet:  Ticket[] = [];
  protected last_reservation_average  = ""  ;

  constructor(protected service  :  ApplicationService){}


  getData(){

    this.service.resParClient().subscribe(data=>{
        this.resParClient = data.value ;
    } , err=> console.log(err)) ;

    this.service.volReserver().subscribe(data=>{
        this.volReserver = data.value ;

    } , err=> console.log(err));


    forkJoin(
      {

        clients : this.service.getAllClient() ,



        voyages : this.service.voyageDisponible(),
        voyage_recent_average : this.service.voyageRecent() ,
        tickets : this.service.listTicket() ,
        average_last_reservation : this.service.reservation_average()
      }
    ).subscribe(
      {
        next :({

                  clients ,
                 tickets  ,
                 voyages,
                 average_last_reservation ,
                 voyage_recent_average

               })=>{
          this.voyages =  voyages ;
          this.nbrVolDispo = voyages.length
          this.last_reservation_average = parseFloat(average_last_reservation.reservation_average).toFixed(1) ;
          this.recentVoyage = parseFloat(voyage_recent_average.average).toFixed(1) ;




          this.typesBillet =  tickets ;

          this.clients = clients ;

        } , error : (e)=>{
          console.log(e) ;
        }  })
  }


  ngOnInit() {
      this.getData() ;
      this.fetchData(1);
      this.paiementRecentFunction() ;
      this.newEarnPourcentageFunction();
      this.gainTotalFunction();
  }


   fetchData( mois  : number){
      this.service.reservationData(mois).subscribe(data=>{
          this.dataRes.gainMoyen =  data.gainMoyen ? parseFloat(data.gainMoyen).toFixed(2) : "0"   ;
          this.dataRes.revenuTotal =  data.revenuTotal ? parseFloat( data.revenuTotal).toFixed(2) : "0"   ;
          
        parseFloat(this.dataRes.gainMoyen).toFixed(2)
      } , error =>  console.log(error))
   }

   paiementRecentFunction(){
      this.service.paiementRecent().subscribe(data=>{
          this.paiementRecent =  parseFloat(data.value).toFixed(2);
          console.log(this.paiementRecent)
         
      } , err=> console.log(err)) ;
   }

   newEarnPourcentageFunction(){
      this.service.newEarnAverageReservation().subscribe(data=>{
          console.log(data) ; 
          this.newEarnPourcentage = parseFloat(data.pourcentvalue).toFixed(2) ; 
          
      } , err=> console.log(err));
   }


   gainTotalFunction(){
      this.service.gainTotal().subscribe(data=>{
          console.log(data) ;
          this.gainTotal = data.gaintotal ; 

      } , err=> console.log(err));
   }
}

import {Component, OnInit} from '@angular/core';
import {ApplicationService} from "../../../service/application.service";
import {
  HistoriqueReservationEffectueComponent
} from "../../historique-reservation-effectue/historique-reservation-effectue.component";
import {
  HistoriqueReservationEnCoursComponent
} from "../../historique-reservation-en-cours/historique-reservation-en-cours.component";
import {HistoriqueAnnulationsComponent} from "../../historique-annulations/historique-annulations.component";
import {HistoriquesPaiementsComponent} from "../../historiques-paiements/historiques-paiements.component";

@Component({
  selector: 'app-agent-historique',
  imports: [
    HistoriqueReservationEffectueComponent,
    HistoriqueReservationEnCoursComponent,
    HistoriqueAnnulationsComponent,
    HistoriquesPaiementsComponent
  ],
  templateUrl: './agent-historique.component.html',
  standalone: true,
  styleUrl: './agent-historique.component.css'
})
export class AgentHistoriqueComponent  implements  OnInit{


  protected view2  : boolean =   true ;
  protected  view3  : boolean =  false ;


  constructor(protected service : ApplicationService) {
  }
  ngOnInit(): void {
    try{
      this.service.view = String(localStorage.getItem("view")) ;
    }catch (e){

    }
  }

  changeView3( ){

    this.view3 = true;
    this.view2 = false ;




  }  changeView2( ){

    this.view2 = true;

    this.view3 = false ;



  }
}

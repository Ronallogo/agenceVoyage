import {Component, OnInit} from '@angular/core';
import {ApplicationService} from "../../../service/application.service";
import {RouterOutlet} from "@angular/router";
import {ClientPaiementComponent} from "../client-paiement/client-paiement.component";
import {HistoriquesPaiementsComponent} from "../../historiques-paiements/historiques-paiements.component";
import {HistoriqueAnnulationsComponent} from "../../historique-annulations/historique-annulations.component";
import {
  HistoriqueReservationEnCoursComponent
} from "../../historique-reservation-en-cours/historique-reservation-en-cours.component";
import {
  HistoriqueReservationEffectueComponent
} from "../../historique-reservation-effectue/historique-reservation-effectue.component";

@Component({
  selector: 'app-client-historique',
  imports: [
    RouterOutlet,
    ClientPaiementComponent,
    HistoriquesPaiementsComponent,
    HistoriqueAnnulationsComponent,
    HistoriqueReservationEnCoursComponent,
    HistoriqueReservationEffectueComponent
  ],
  templateUrl: './client-historique.component.html',
  standalone: true,
  styleUrl: './client-historique.component.css'
})
export class ClientHistoriqueComponent  implements OnInit{

  protected view1  : boolean =  false ;
  protected view2  : boolean =  true;
  protected  view3  : boolean =  false ;
  protected view4:  boolean  = false;

  constructor(protected service : ApplicationService) {
  }
  ngOnInit(): void {

  }

    changeView3( ){

        this.view3 = true;
        this.view2 = false ;




  }  changeView2( ){

        this.view2 = true;

        this.view3 = false ;



  }

}

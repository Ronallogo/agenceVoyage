import { Routes } from '@angular/router';
import { DashbordComponent } from '../../components/agentComponents/dashbord/dashbord.component';
import { ClientComponent } from '../../components/agentComponents/client/client.component';
import { AgentComponent } from '../../components/agentComponents/agent/agent.component';
import { VoyageComponent } from '../../components/agentComponents/voyage/voyage.component';
import { ReservationComponent } from '../../components/agentComponents/reservation/reservation.component';
import { TicketComponent } from '../../components/agentComponents/ticket/ticket.component';
import { PaiementComponent } from '../../components/agentComponents/paiement/paiement.component';
import {ProfileComponent} from "../../components/profile/profile.component";
import {
  ClientReservationComponent
} from "../../components/clientComponents/client-reservation/client-reservation.component";
import {ClientPaiementComponent} from "../../components/clientComponents/client-paiement/client-paiement.component";
import {ClientVoyageComponent} from "../../components/clientComponents/client-voyage/client-voyage.component";
import {
  ClientHistoriqueComponent
} from "../../components/clientComponents/client-historique/client-historique.component";




export const ClientRoute : Routes = [

  {path : 'dashboard' , component :  DashbordComponent  }  ,
  {path : 'client' , component : ClientComponent} ,
  {path : 'agent' , component : AgentComponent} ,
  {path : 'client-voyage'  , component  :  ClientVoyageComponent}  ,
  {path : 'client-reservation' , component : ClientReservationComponent},
  {path : 'billet' , component : TicketComponent} ,
  {path : 'client-paiement' , component :  ClientPaiementComponent } ,
  {path : 'profile' , component : ProfileComponent} ,
  {path : "client-historique" , component : ClientHistoriqueComponent}



] ;

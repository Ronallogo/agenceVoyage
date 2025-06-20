import { Routes } from '@angular/router';
import { DashbordComponent } from '../../components/agentComponents/dashbord/dashbord.component';
import { ClientComponent } from '../../components/agentComponents/client/client.component';
import { AgentComponent } from '../../components/agentComponents/agent/agent.component';
import { VoyageComponent } from '../../components/agentComponents/voyage/voyage.component';
import { ReservationComponent } from '../../components/agentComponents/reservation/reservation.component';
import { TicketComponent } from '../../components/agentComponents/ticket/ticket.component';
import { PaiementComponent } from '../../components/agentComponents/paiement/paiement.component';
import {ProfileComponent} from "../../components/profile/profile.component";
import {AgentHistoriqueComponent} from "../../components/agentComponents/agent-historique/agent-historique.component";




export const  AgentRoute : Routes = [

    {path : 'dashboard' , component :  DashbordComponent  }  ,
    {path : 'client' , component : ClientComponent} ,
    {path : 'agent' , component : AgentComponent} ,
    {path : 'voyage'  , component  : VoyageComponent}  ,
    {path : 'reservation' , component : ReservationComponent},
    {path : 'billet' , component : TicketComponent} ,
    {path : 'paiement' , component : PaiementComponent } ,
  {path : 'profile' , component : ProfileComponent} ,
  {path : 'historique' , component :  AgentHistoriqueComponent} ,



] ;

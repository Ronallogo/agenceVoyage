import { Routes } from '@angular/router';
import { DashbordComponent } from '../../components/dashbord/dashbord.component';
import { ClientComponent } from '../../components/client/client.component';
import { AgentComponent } from '../../components/agent/agent.component';
import { VoyageComponent } from '../../components/voyage/voyage.component';
import { ReservationComponent } from '../../components/reservation/reservation.component';
import { TicketComponent } from '../../components/ticket/ticket.component';
import { PaiementComponent } from '../../components/paiement/paiement.component';
 



export const AgentRoute : Routes = [

    {path : 'dashboard' , component :  DashbordComponent  }  , 
    {path : 'client' , component : ClientComponent} , 
    {path : 'agent' , component : AgentComponent} , 
    {path : 'voyage'  , component  : VoyageComponent}  , 
    {path : 'reservation' , component : ReservationComponent},
    {path : 'billet' , component : TicketComponent} , 
    {path : 'paiement' , component : PaiementComponent}

    
] ; 
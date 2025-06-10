import { Routes } from '@angular/router';
import { LoginComponent } from '../../components/login/login.component';
import { DashbordComponent } from '../../components/dashbord/dashbord.component';
import { ClientComponent } from '../../components/client/client.component';
import { AgentComponent } from '../../components/agent/agent.component';
import { ReservationComponent } from '../../components/reservation/reservation.component';
import { TicketComponent } from '../../components/ticket/ticket.component';
import { VoyageComponent } from '../../components/voyage/voyage.component';



export const HomeRoute : Routes = [
 
    { path: 'dashboard', component:  DashbordComponent },
     { path: 'client', component:  ClientComponent },
     { path: 'agent', component:   AgentComponent },
     { path: 'voyage', component:  VoyageComponent },
     { path: 'reservation', component:   ReservationComponent },
     { path: 'ticket', component:  TicketComponent },
     {path : 'agent' , component : AgentComponent} , 

    
] ; 
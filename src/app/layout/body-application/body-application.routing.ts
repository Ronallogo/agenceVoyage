import { Routes } from '@angular/router';
import { LoginComponent } from '../../components/login/login.component';
import { DashbordComponent } from '../../components/agentComponents/dashbord/dashbord.component';
import { ClientComponent } from '../../components/agentComponents/client/client.component';
import { AgentComponent } from '../../components/agentComponents/agent/agent.component';
import { ReservationComponent } from '../../components/agentComponents/reservation/reservation.component';
import { TicketComponent } from '../../components/agentComponents/ticket/ticket.component';
import { VoyageComponent } from '../../components/agentComponents/voyage/voyage.component';



export const HomeRoute : Routes = [

    { path: 'dashboard', component:  DashbordComponent },
     { path: 'client', component:  ClientComponent },
     { path: 'agent', component:   AgentComponent },
     { path: 'voyage', component:  VoyageComponent },
     { path: 'reservation', component:   ReservationComponent },
     { path: 'ticket', component:  TicketComponent },
     {path : 'agent' , component : AgentComponent} ,


] ;

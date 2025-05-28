import { Routes } from '@angular/router';
import {DashbordComponent} from "./components/dashbord/dashbord.component";
import {ClientComponent} from "./components/client/client.component";
import {VoyageComponent} from "./components/voyage/voyage.component";
import {ReservationComponent} from "./components/reservation/reservation.component";
import {createComponent} from "@angular/core";
import {TicketComponent} from "./components/ticket/ticket.component";
import { AgentComponent } from './components/agent/agent.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component:  DashbordComponent },
  { path: 'client', component:  ClientComponent },
  { path: 'agent', component:   AgentComponent },
  { path: 'voyage', component:  VoyageComponent },
  { path: 'reservation', component:   ReservationComponent },
  { path: 'ticket', component:  TicketComponent },
  {path : 'agent' , component : AgentComponent}



];

import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HomeRoute } from './components/home/home.routing';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import path from 'path';
import {FirstSightComponent} from "./components/first-sight/first-sight.component";
import {HomeReservationComponent} from "./components/home-reservation/home-reservation.component";
import { AgentComponent } from './components/agent/agent.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { VoyageComponent } from './components/voyage/voyage.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { AgentLayoutComponent } from './layout/agent-layout/agent-layout.component';
import { AgentRoute } from './layout/agent-layout/agent.routing';


export const routes: Routes = [
  { path: '', redirectTo: 'home/first-sight', pathMatch: 'full' },

  {path : 'agent' ,
    component : AgentLayoutComponent , 
    children:  [...AgentRoute]
  },

 // {path : 'admin' } , 
  

  {
    path : 'home'  ,
    component : HomeComponent , 
    children : [...HomeRoute]
  }


];
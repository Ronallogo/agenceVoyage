import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HomeRoute } from './components/home/home.routing';
import { DashbordComponent } from './components/agentComponents/dashbord/dashbord.component';
import path from 'path';
import {FirstSightComponent} from "./components/first-sight/first-sight.component";
import {HomeReservationComponent} from "./components/home-reservation/home-reservation.component";
import { AgentComponent } from './components/agentComponents/agent/agent.component';
import { ReservationComponent } from './components/agentComponents/reservation/reservation.component';
import { VoyageComponent } from './components/agentComponents/voyage/voyage.component';
import { TicketComponent } from './components/agentComponents/ticket/ticket.component';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { AgentRoute } from './layout/user-layout/agent.routing';
import {ClientRoute} from "./layout/user-layout/client-routing";
import {ProfileComponent} from "./components/profile/profile.component";


export const routes: Routes = [
  { path: '/', redirectTo: 'home/first-sight', pathMatch: 'full' },

  {path : 'user' ,
    component : UserLayoutComponent ,
    children:  [...AgentRoute ,...ClientRoute , ]
  },


  {
    path : 'home'  ,
    component : HomeComponent ,
    children : [...HomeRoute]
  }


];

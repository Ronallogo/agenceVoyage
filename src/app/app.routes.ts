import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
 
import { HomeRoute } from './components/home/home.routing';
 
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { AgentRoute } from './layout/user-layout/agent.routing';
import {ClientRoute} from "./layout/user-layout/client-routing";
 
export const routes: Routes = [
  { path: '', redirectTo: 'home/first-sight', pathMatch: 'full' },

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

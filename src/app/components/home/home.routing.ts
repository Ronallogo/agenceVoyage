import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { FirstSightComponent } from '../first-sight/first-sight.component';
import {RegisterComponent} from "../register/register.component";



export const HomeRoute : Routes = [

    {path : 'login' , component : LoginComponent  }  ,
    {path : 'first-sight'  , component : FirstSightComponent} ,
    {path : 'register'  , component : RegisterComponent}



] ;

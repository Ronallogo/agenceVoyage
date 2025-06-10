import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {samePassword, validatorPassword} from "../../../model/interfaces";
import {NgClass} from "@angular/common";
import {AuthenticationService} from "../../service/authentication.service";
import {   Router } from '@angular/router';
 

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    
  ],
   
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  protected formUser =  new FormGroup({
     username :  new FormControl() ,

    password :  new FormControl() ,
  });

  constructor(protected auth : AuthenticationService , protected router : Router   ) {
  }
  searchClient() {

  }

  refresh() {

  }

  protected readonly validatorPassword = validatorPassword;
  protected readonly samePassword = samePassword;




  login() {
      this.auth.login({...this.formUser.getRawValue()}).subscribe(data=>{
          localStorage.setItem("user" , JSON.stringify(data.access_token) );
          this.router.navigate(['/agent/dashboard'])


          console.log(this.auth.getUser(data.access_token)) ; 
           

      } , err=>{
        console.log(err) ; 
        localStorage.setItem("user" , JSON.stringify(undefined) );
      })
  }
}

import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {   samePassword, validatorPassword } from '../../../model/interfaces';
import {_confirmation, _error} from "../../notification/notification";
import {ApplicationService} from "../../service/application.service";
import {NgIf} from "@angular/common";
import {AuthenticationService} from "../../service/authentication.service";
import {timeout} from "rxjs";
import {IndexedDbService} from "../../service/indexed-db.service";


@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    nomClient :     new FormControl("" , [Validators.required , Validators.minLength(3) , Validators.pattern(/^[^0-9]*$/) ]) ,
    prenomClient :  new FormControl("" , [Validators.required   , Validators.minLength(3) , Validators.pattern(/^[^0-9]*$/) ]) ,
    mailClient :    new FormControl("" , [Validators.required ,Validators.email]) ,
    dateNaiss :    new FormControl("" , [Validators.required ]) ,
    sexeClient :    new FormControl(null , [Validators.required]) ,
    telClient :     new FormControl("" , [Validators.required ,Validators.pattern(/^\+?[0-9]{8,15}$/)]) ,
    login :        new FormControl("" ,) ,
    password  :      new FormControl("" , [Validators.required , Validators.minLength(8)]) ,
    confirmPassword: new FormControl("" , Validators.required)


  });

  constructor(
    protected service : ApplicationService ,
    protected auth :  AuthenticationService   ,
    protected router : Router ,
    private indexedDBService: IndexedDbService
    ) {}

  validatorPassword(password  : string |null){
    return  validatorPassword(String(password)).length
  }

  samePassword(){
    return samePassword(String(this.registerForm.getRawValue().confirmPassword)  , String(this.registerForm .getRawValue().password ));
  }




  errorFound:  boolean = false;

   register(){
     console.log(this.registerForm.getRawValue())
     this.service.createClient(this.registerForm.getRawValue())
       .then(async (data) => {
         try {
           _confirmation(" Bienvenu " + this.registerForm.getRawValue().prenomClient + "!!!😊");
           const user =  this.auth.getUser(data.access_token) ;
           await this.indexedDBService.setUser({id :0 , ...user });
           this.service.user = await this.indexedDBService.getUser();


           if (this.service?.user !== undefined) {
             await this.router.navigate(['/user/profile']);
           }



         } catch (e) {

         }


         console.log(data)
       })
       .catch(err=> {
         _error("Une erreur s'est survenue : "+err.error) ;
         console.log(err);
       })
   }

  checkForm():boolean {
    return (

      (this.registerForm.controls.nomClient.invalid && this.registerForm.controls.nomClient.dirty) ||
      (this.registerForm.controls.prenomClient.invalid && this.registerForm.controls.prenomClient.dirty) ||
      (this.registerForm.controls.dateNaiss.invalid && this.registerForm.controls.dateNaiss.dirty) ||
      (this.registerForm.controls.sexeClient.invalid && this.registerForm.controls.sexeClient.dirty) ||
      (this.registerForm.controls.mailClient.invalid && this.registerForm.controls.mailClient.dirty) ||
      (this.registerForm.controls.telClient.invalid && this.registerForm.controls.telClient.dirty)


    );
  }
}

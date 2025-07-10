import {Component, OnInit} from '@angular/core';

import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../../service/authentication.service";
import {ApplicationService} from "../../service/application.service";
import {_confirmation, _warning} from "../../notification/notification";
import {IndexedDbService} from "../../service/indexed-db.service";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-profile',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrl: './profile.component.css'
})
export class ProfileComponent  implements   OnInit{
    protected loading : boolean = false;
    protected role ="" ;

  formUser =  new FormGroup({
    prenomUser : new FormControl( '' , [ Validators.pattern(/^[^0-9]*$/)  ,  Validators.required , Validators.minLength(3)]),
    nomUser : new FormControl('' , [  Validators.pattern(/^[^0-9]*$/)  ,  Validators.required , Validators.minLength(3)]),
    mailUser: new FormControl('' , [Validators.email ,  Validators.required , Validators.minLength(1)])  ,
    telUser  :  new FormControl('' , [Validators.pattern(/^\+?[0-9]{8,15}$/) ,  Validators.required , Validators.minLength(1)])  ,


  });

  constructor(
    protected service  : ApplicationService ,
    protected auth : AuthenticationService ,
    protected indexedDbService : IndexedDbService ){}

  modify(){
    let role = this.service.user.roles[0].authority ;
    let current_email  =  this.service.user.email ;
    this.auth.update({
      firstname : String(this.formUser.getRawValue().prenomUser) ,
      lastname : String(this.formUser.getRawValue().nomUser ),
      phone : String(this.formUser.getRawValue().telUser) ,
      email : String(this.formUser.getRawValue().mailUser)
    } , role , current_email).subscribe(async data => {
      _confirmation("Modification effectuée !!!😊");
      console.log(data);
      const user = this.auth.getUser(data.access_token);

      await this.indexedDbService.setUser({id: 0, ...user});
      this.service.user = await this.indexedDbService.getUser();
      console.log(this.service.user);
      console.log(this.service.user);

    }  , error => {
        _warning("Une erreur c'est produite veuillez réessayer plutard!!") ;
       // console.log(error) ;
    })
  }






  ngOnInit(): void {
    this.role =  this.service?.user.roles[0].authority ;
    try{
      setTimeout(async () => {
        this.service.user = await this.indexedDbService.getUser();
        //  this.service.user = JSON.parse(String(localStorage.getItem("user")));
        this.formUser.setValue({
          nomUser: this.service.user?.lastname || "",
          prenomUser: this.service.user?.firstname || "",
          mailUser: this.service.user?.email || "",
          telUser: this.service.user?.phone || ""
        });


      }   ,2000) ;
    }catch (e){
        console.log("Donnée en chargement!!")
    }
    setTimeout(()=>{
      this.loading = true
    } , 2000)
  }
}

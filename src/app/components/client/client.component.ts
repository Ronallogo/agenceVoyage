import { Component, OnInit } from '@angular/core';
 
import {ApplicationService} from "../../service/application.service";
import {NgClass} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {Client_2} from "../../../model/interfaces";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { _confirmation, _error, _makeSure, _warning } from '../../notification/notification';
import { error } from 'console';
import { response } from 'express';
 

@Component({
    selector: 'app-client',
  imports: [
    NgClass,
    NgxPaginationModule , 
    FormsModule,
    ReactiveFormsModule
  ],
    standalone : true ,
    templateUrl: './client.component.html',
    styleUrl: './client.component.css'
})
export class ClientComponent implements  OnInit{
 
  protected formClient = new FormGroup({
    nomClient : new FormControl("" , [Validators.required , Validators.maxLength(3)]) , 
    sexeClient : new FormControl("" , [Validators.required , Validators.maxLength(1)]) , 
    dateNaiss : new FormControl("" , [Validators.required]) , 
    mailClient : new FormControl("" , [Validators.email , Validators.required]),
    telClient : new FormControl("" , [Validators.required]),
  });


  protected onUpdating: any;
  protected clientSelected = {
    nomClient : "" , 
    prenomClient : "" , 
    sexeClient : "" , 
    dateNaiss : "" , 
    telClient  : "",
    mailClient : ""

  };
  indexedLocation  :  number = 0 ;
  
  

  protected  selection : string = "" ;
  entete:  string[]=["No" , "Nom" , "Prenom" , "Date de naissance" , "Email" , "Sexe" , "Phone" , "Action"];
  currentPage:  number = 0 ;
  clients : Client_2[] = [];


  searchClient(){
    if(this.formClient.getRawValue().dateNaiss ==  ""){
        _warning("La saisie de la date est obligatoire !! 😑") ; 
        return ; 
      }
    
    this.service.search(this.formClient.getRawValue()).subscribe(data=>{
        this.clients = data ; 
        console.log(data);
        
    } , error=>{
      _error(error.error);
      console.log(error); 
        
    })

  }

  refresh(){

    this.service.refresh().subscribe(data=>{
      this.clients = data ; 
      console.log(data) ;
    } , error=>{
      console.log(error) ; 
      _error("Une erreur est survenu");

    })

  }






  constructor( protected service : ApplicationService){}


  ngOnInit(): void {
    this.listClient() ; 

  }
 

  listClient(){
      this.service.getAllClient().subscribe(data=>{
          this.clients  = data ; 
      } , err=>{
        console.log(err);
      })
  }


  modifier(t:  Client_2) {
    t.nomClient = this.clientSelected.nomClient ;
    t.sexeClient = this.clientSelected.sexeClient;
    t.prenomClient = this.clientSelected.prenomClient ; 
    t.mailClient = this.clientSelected.mailClient ; 
    t.telClient  = this.clientSelected.telClient ; 
    t.dateNaiss = this.clientSelected.dateNaiss ;  
    

    console.log(t);

    this.service.updateClient(t).subscribe(data=>{
      _confirmation("Confirmation effectué avec succès 😃!!") ; 
      this.listClient();
    } , error=>{
        _error("Une erreur est survenue !!!") ; 
    }) ; 
    this.listClient();

  }

  async deleteClient(idClient:  number) {
    let response  = await _makeSure("Voulez vous supprimez ce client???") ; 
    if(!response) return ; 

    this.service.deleteClient(idClient).subscribe(data=>{
        _confirmation("client supprimer avec succès !!")
    } ,error=>{
        _error("Une erreur c est produite");
        console.log(error);
    })


  }

  pageChanged($event: number) {
      this.currentPage = $event ; 
  }

  indexLocationFunction(c:  Client_2){
    this.indexedLocation = c.idClient;
    this.clientSelected.nomClient = c.nomClient ;
    this.clientSelected.sexeClient = c.sexeClient;
    this.clientSelected.prenomClient = c.prenomClient ; 
    this.clientSelected.mailClient = c.mailClient ; 
    this.clientSelected.telClient  = c.telClient ; 
    this.clientSelected.dateNaiss = c.dateNaiss ; 
  }
  
  listenUpdate(c:   Client_2) {
    this.onUpdating = !this.onUpdating;
    this.clientSelected.nomClient = c.nomClient ;
    this.clientSelected.sexeClient = c.sexeClient;
    this.clientSelected.prenomClient = c.prenomClient ; 
    this.clientSelected.mailClient = c.mailClient ; 
    this.clientSelected.telClient  = c.telClient ; 
    this.clientSelected.dateNaiss = c.dateNaiss ; 
  }

  cancelUpdate(){
    this.onUpdating = !this.onUpdating;
  }
}

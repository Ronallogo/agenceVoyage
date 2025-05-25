import { Component, OnInit } from '@angular/core';
import {VOYAGES} from "../../../model/data";
import {ApplicationService} from "../../service/application.service";
import {NgClass} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {Client_2} from "../../../model/interfaces";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

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
 

  protected ndexedLocation: any;
  protected onUpdating: any;
  protected clientSelected = {
    nomClient : "" , 
    prenomClient : "" , 
    sexeClient : "" , 
    dateNaiss : "" , 
    telClient  : "",
    mailClient : ""

  };
  indexedLocation  : string = "0" ;
  
  

  protected  selection : string = "" ;
  entete:  string[]=["No" , "Nom" , "Prenom" , "Date de naissance" , "Email" , "Sexe" , "Phone" , "Action"];
  currentPage:  number = 0 ;
  clients : Client_2[] = [];


  searchClient(){

  }

  refresh(){

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


  modifier(t: any) {

  }

  deleteClient(idClient: string) {

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
    this.clientSelected.dateNaiss = c.telClient ; 
  }
  
  listenUpdate(c:   Client_2) {
    this.onUpdating = !this.onUpdating;
    this.clientSelected.nomClient = c.nomClient ;
    this.clientSelected.sexeClient = c.sexeClient;
    this.clientSelected.prenomClient = c.prenomClient ; 
    this.clientSelected.mailClient = c.mailClient ; 
    this.clientSelected.telClient  = c.telClient ; 
    this.clientSelected.dateNaiss = c.telClient ; 
  }

  cancelUpdate(){
    this.onUpdating = !this.onUpdating;
  }
}

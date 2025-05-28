import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Application } from 'express';
import { ApplicationService } from '../../service/application.service';
import {NgxPaginationModule} from "ngx-pagination";

@Component({
  selector: 'app-agent',
  imports: [FormsModule , ReactiveFormsModule , NgxPaginationModule],
  templateUrl: './agent.component.html',
  styleUrl: './agent.component.css'
})
export class AgentComponent {
pageChanged($event: number) {
throw new Error('Method not implemented.');
}
deleteClient(arg0: any) {
throw new Error('Method not implemented.');
}
listenUpdate(_t119: any) {
throw new Error('Method not implemented.');
}
modifier(_t119: any) {
throw new Error('Method not implemented.');
}
cancelUpdate() {
throw new Error('Method not implemented.');
}
indexedLocation: any;
onUpdating: any;
currentPage: any;
agents: any;
indexLocationFunction(_t119: any) {
throw new Error('Method not implemented.');
}
 

  protected formAgentResarch = new FormGroup({
  nomAgent : new FormControl("" ) , 
  mailAgent : new FormControl("" ) , 
  dateNaiss : new FormControl("" ) , 
  sexeAgent : new FormControl("" ) , 
  telAgent : new FormControl("" )


  });
  protected formAgent = new FormGroup({
  nomAgent : new FormControl("" , [Validators.required]) , 
  mailAgent : new FormControl("" , [Validators.required]) , 
  dateNaiss : new FormControl("" , [Validators.required]) , 
  sexeAgent : new FormControl("" , [Validators.required]) , 
  telAgent : new FormControl("" , [Validators.required  ])


  });
  entete: string[] = ["No" , "Nom" , "Prenom" , "Date de naissance" , "Email" , "Sexe" , "Phone" , "Action"];
clients: any;


  constructor(protected service : ApplicationService){

  }

  refresh() {

  }
  searchAgent() {

  }

}

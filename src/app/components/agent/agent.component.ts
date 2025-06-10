import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, FormsModule, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import e, { Application } from 'express';
import { ApplicationService } from '../../service/application.service';
import {NgxPaginationModule} from "ngx-pagination";
import { Agent_1, samePassword, validatorPassword } from '../../../model/interfaces';
import { _confirmation, _error, _makeSure, _warning } from '../../notification/notification';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-agent',
  imports: [FormsModule, ReactiveFormsModule, NgxPaginationModule, NgClass],
  templateUrl: './agent.component.html',
  standalone: true,
  styleUrl: './agent.component.css'
})
export class AgentComponent implements OnInit {

  validatorPassword(password  : string |null){
    return  validatorPassword(String(password)).length
  }

  samePassword(){
    return samePassword(String(this.formAgent.getRawValue().confirmPassword)  , String(this.formAgent.getRawValue().password ));
  }







  indexedLocation: number = 0;
  onUpdating: boolean  =  false;
  currentPage: number = 0;
  agents: Agent_1[] = [] ;



  protected formAgentResarch = new FormGroup({
  nomAgent : new FormControl("" ) ,
  mailAgent : new FormControl("" ) ,
  dateNaiss : new FormControl("" ) ,
  sexeAgent : new FormControl("" ) ,
  telAgent : new FormControl("" )


  });

  protected agentSelected = {
    nomAgent : "" ,
    prenomAgent : "",
    mailAgent : "",
    dateNaiss : "",
    sexeAgent : "",
    telAgent :  ""
  };

  protected formAgent = new FormGroup({
  nomAgent : new FormControl("" , [Validators.required , Validators.minLength(3) , Validators.pattern(/^[^0-9]*$/) ]) ,
  prenomAgent : new FormControl("" , [Validators.required   , Validators.minLength(3) , Validators.pattern(/^[^0-9]*$/) ]) ,
  mailAgent : new FormControl("" , [Validators.required ,Validators.email]) ,
  dateNaiss : new FormControl("" , [Validators.required ]) ,
  sexeAgent : new FormControl(null , [Validators.required]) ,
  telAgent : new FormControl("" , [Validators.required ,Validators.pattern(/^\+?[0-9]{8,15}$/)]) ,
  login : new FormControl("" ,) ,
  password  : new FormControl("" , [Validators.required , Validators.minLength(6)]) ,
  confirmPassword : new FormControl("" , Validators.required)


  });


  entete: string[] = ["No" , "Nom" , "Prenom" , "Date de naissance" , "Email" , "Sexe" , "Phone" , "Action"];
  clients: any;


  constructor(protected service : ApplicationService){

  }
  ngOnInit(): void {
      this.listAgent()
  }

  refresh() {
    this.listAgent() ;
  }







  pageChanged($event: number) {
      this.currentPage = $event ;
  }
  async deleteAgent(idAgent: any) {
    let response  = await _makeSure("Voulez vous supprimez ce client???") ;
    if(!response) return ;

    this.service.deleteAgent(idAgent)
    .subscribe(()=>{
        _confirmation("Agent supprimé avec sucès!!😊") ;
        this.listAgent();
    } , ()=> _error("Une Erreur est survenu😪"))
    ;
  }
  listenUpdate(c: Agent_1) {
      this.onUpdating = !this.onUpdating;
      this.agentSelected.nomAgent = c.nomAgent ;
      this.agentSelected.sexeAgent = c.sexeAgent;
      this.agentSelected.prenomAgent = c.prenomAgent ;
      this.agentSelected.mailAgent = c.mailAgent;
      this.agentSelected.telAgent  = c.telAgent ;
      this.agentSelected.dateNaiss = c.dateNaiss ;
  }
  modifier(a: Agent_1) {
    a.nomAgent  = this.agentSelected.nomAgent ;
    a.sexeAgent = this.agentSelected.sexeAgent;
    a.prenomAgent = this.agentSelected.prenomAgent ;
    a.mailAgent = this.agentSelected.mailAgent ;
    a.telAgent   = this.agentSelected.telAgent ;
    a.dateNaiss = this.agentSelected.dateNaiss ;


      console.log(a);

      this.service.updateAgent(a)
      . subscribe(data=>{
          _confirmation("Agent modifié avec succès !!😊") ;
          console.log(data);
          this.onUpdating = !this.onUpdating;
          this.listAgent();
      } , err=>{
          console.log(err) ; 
      }) ; 
       

  }

    cancelUpdate(){
      this.onUpdating = !this.onUpdating;
    }
  indexLocationFunction(a: Agent_1) {
    this.indexedLocation = a.idAgent;
    this.agentSelected.nomAgent = a.nomAgent ;
    this.agentSelected.sexeAgent = a.sexeAgent;
    this.agentSelected.prenomAgent = a.prenomAgent ;
    this.agentSelected.mailAgent = a.mailAgent;
    this.agentSelected.telAgent  = a.telAgent ;
    this.agentSelected.dateNaiss = a.dateNaiss ;
  }

  listAgent(){
    this.service.getListAgent()
    .then(data=> this.agents = data)
    .catch(err=>_error("Une erreur s'est produit"));
  }

  searchAgent(){
    if(this.formAgentResarch.getRawValue().dateNaiss == ""){
      _warning("La saisie de la date est obligatoire !! 😑") ;
      return ;
    }
    this.service.searchAgent(this.formAgentResarch.getRawValue())
    .subscribe(data=> this.agents = data , (err)=> console.log(err));
     
  }
  createAgent(){


      console.log(this.formAgent.getRawValue())
      this.service.createAgent(this.formAgent.getRawValue())
      .then((data)=> {
          _confirmation("Cet agent est enregisté avec succès!!!😊") ;
          this.listAgent();
          console.log(data)
      })
      .catch(err=> _error("Une erreur s'est survenue : "+err))
  }

     checkForm():boolean{
      return (

        (this.formAgent.controls.nomAgent.invalid && this.formAgent.controls.nomAgent.dirty) ||
        ( this.formAgent.controls.prenomAgent.invalid && this.formAgent.controls.prenomAgent.dirty)||
        (this.formAgent.controls.dateNaiss.invalid && this.formAgent.controls.dateNaiss.dirty)||
        (this.formAgent.controls.sexeAgent.invalid && this.formAgent.controls.sexeAgent.dirty)||
        (this.formAgent.controls.mailAgent.invalid && this.formAgent.controls.mailAgent.dirty)||
        (this.formAgent.controls.telAgent.invalid && this.formAgent.controls.telAgent.dirty)


      );
    }





}





import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Agent_1, Client_2, Ticket, Voyage} from "../../model/interfaces";
import { response } from 'express';
 

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  


  private BaseUrl = "http://localhost:8081/tg/voyage_pro/reservation/auth/";
  hide : string = "liste" ;

  constructor(private http : HttpClient) { }
 /**
  * 
  * @param voyage 
  * @returns 
  * 
  *  FONCTIONNALITÉS DU MODULE VOYAGE
  */
  createVoyage(voyage :  any) : Observable<any>{
    return  this.http.post(this.BaseUrl+"voyage/create" , voyage);
  }

  listVoyage():Observable<any>{
    return this.http.get(this.BaseUrl+"voyage/getAll");
  }


  updateVoyage(voyage : Voyage) : Observable<any>{
    return this.http.put( this.BaseUrl+"voyage/update/"+voyage.idVoyage , voyage) ; 
  }

  deleteVoyage(idVoyage : number):Observable<any>{
      return this.http.delete(this.BaseUrl+"voyage/delete/"+idVoyage);
  }


  /* ------------------------------------------------------*/

  /**
   * 
   * @param client 
   * @returns 
   * 
   * FONCTIONNALITÉS DU MODULE CLIENT
   */
  createClient(client : any):Observable<any>{
      return this.http.post(this.BaseUrl+"client/create",client);
  }  
  getAllClient():Observable<any>{
      return this.http.get(this.BaseUrl+"client/getAll")
  }

  updateClient(client :   Client_2):Observable<any>{
    return this.http.put(this.BaseUrl+"client/update/"+client.idClient , client)
  }

  deleteClient(idClient : number):Observable<any>{
      return this.http.delete(this.BaseUrl+"client/delete/"+idClient);
  }


  refresh():Observable<any>{
    return this.http.get(this.BaseUrl+"client/refresh") ; 
  }

  search(t : any):Observable<any>{
    return  this.http.put(this.BaseUrl+"client/search" , t) ; 
  }



  /*______________________________________________________________  */

  /**
   * 
   * @param ticket 
   * @returns 
   */
  createTicket(ticket : any):Observable<any>{
    return this.http.post(this.BaseUrl+"ticket/create" ,  ticket);

  }
  listTicket():Observable<any>{
    return this.http.get(this.BaseUrl+"ticket/getAll");
  }


  deleteTicket(idTicket : number){
    return this.http.delete(this.BaseUrl+"ticket/delete/"+idTicket);
  }

  updateTicket(Ticket : Ticket){
    return this.http.put(this.BaseUrl+"ticket/update/"+Ticket.idTypeBillet , Ticket);
  }
  /*________________________________________________________*/


 
  /**
   * 
   * @param agent 
   * @returns 
   */
  async createAgent(agent : any){
    let reponse = await fetch(this.BaseUrl+"agent/create" ,  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(agent)
    }) ; 

    return reponse.json() ; 
  }
  
  async getListAgent(){
    let response = await fetch(this.BaseUrl+"agent/getAll",{ method : 'GET'})
    return response.json()
     
  }

  async searchAgent(agent : any){
      let reponse = await fetch(this.BaseUrl+"agent/search" ,  {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(agent)
    }) ; 

    return reponse.json() ;
  }

  async updateAgent(agent : Agent_1){

    let response = await fetch(this.BaseUrl+"agent/update/"+agent.idAgent , {
      method : 'PUT'  , 
      headers :{
        'Content-Type': 'application/json'
      } , 
      
      body : JSON.stringify(agent)
    }) ; 
    return response.json();

  }

  async deleteAgent(idAgent: any) {
    let response = await fetch(this.BaseUrl+"agent/delete/"+idAgent , {method : 'DELETE'}) ; 
    return response.json()
  }



  /*_________________________________________________*/

}

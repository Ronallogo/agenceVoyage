import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client_2, Voyage} from "../../model/interfaces";
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { resourceUsage } from 'process';

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

}

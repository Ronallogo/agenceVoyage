import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Agent_1, Client_2, Reservation, Ticket, Voyage} from "../../model/interfaces";
import { response } from 'express';
import { resourceUsage } from 'process';


@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  public listeVoyage : Voyage[] = [] ;
  public listeTypeBillet :Ticket[] =  [] ;
  public listeClient : Client_2[] = [] ;
  public listePaiement : any[] = [] ;
  public listeAgent  : Agent_1[] = []  ;
  public listeReservation : Reservation[] = [] ;


 public view : string = "profil" ;
  user : any = {
    firstname : "" ,
    lastname : "" ,
    exp: 1749788223 ,
    iat : 1749788304 ,
    sexe : "" ,
    sub : "" ,
    phone : "" ,
    roles : [{authority  : ""}]

  } ;
  role : string = "";





  private BaseUrl = "http://localhost:8081/tg/voyage_pro/reservation/auth/";
  private BaseUrl2 = "http://localhost:8081/tg/voyage_pro/reservation/";
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





  allDepart() :Observable<any>{
      return this.http.get(this.BaseUrl+"voyage/agent/departs") ;
  }
  allDepartDispo() :Observable<any>{
      return this.http.get(this.BaseUrl+"voyage/client/departs") ;
  }

  recentVoyages() :Observable<any>{
    return this.http.get(this.BaseUrl+"voyage/recent");
  }

  allArrive(){
    return this.http.get(this.BaseUrl+"voyage/agent/arrivees") ;
  }

  allArriveDispo(){
    return this.http.get(this.BaseUrl+"voyage/client/arrivees") ;
  }

  volReserver():Observable<any>{
    return this.http.get(this.BaseUrl+"voyage/agent/volReserver") ;
  }

  voyageRecent():Observable<any>{
      return this.http.get(this.BaseUrl+"voyage/agent/averageRecentVoyage");
  }

  voyageDisponible():Observable<any>{
      return  this.http.get(this.BaseUrl+"voyage/available") ;
  }

   



  listVoyage():Observable<any>{
    return this.http.get("http://localhost:8081/tg/voyage_pro/reservation/auth/voyage/getAll");
  }

  voyageTop3():Observable<any>{
    return this.http.get(this.BaseUrl+"voyage/top3") ; 
  }


  updateVoyage(voyage : Voyage) : Observable<any>{
    return this.http.put( this.BaseUrl+"voyage/update/"+voyage.idVoyage , voyage) ;
  }

  deleteVoyage(idVoyage : number):Observable<any>{
      return this.http.delete(this.BaseUrl+"voyage/delete/"+idVoyage);
  }

  researhForClient(
    depart : string ,
    arrivee : string ,
    dateVoyage : string
  ) : Observable<any>{
    console.log(depart , arrivee , dateVoyage) ;

     return  this.http.put("http://localhost:8081/tg/voyage_pro/reservation/auth/voyage/client/research"  , {

       departVoyage : depart ,
       arriveVoyage : arrivee ,
       dateVoyage : dateVoyage
     });
  }

  researhForAgent(
    depart : string ,
    arrivee : string ,
    dateVoyage : string
  ) : Observable<any>{

     return  this.http.put(this.BaseUrl+"voyage/agent/research"  , {

       departVoyage : depart ,
       arriveVoyage : arrivee ,
       dateVoyage : dateVoyage
     });
  }


  /* ------------------------------------------------------*/

  /**
   *
   * @param client
   * @returns
   *
   * FONCTIONNALITÉS DU MODULE CLIENT
   */
  async createClient( client : any){
    let response = await fetch(this.BaseUrl2+"client/register" ,  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(client)
    }) ;

    return response.json() ;
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

  researchTicket(keyword : string):Observable<any>{
      return this.http.get(this.BaseUrl+"ticket/research/"+keyword) ; 
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


  research(keyword : string):Observable<any>{
      return this.http.get(this.BaseUrl+ "/ticket/"+keyword) ; 
  }
  /*________________________________________________________*/



  /**
   *
   * @param agent
   * @returns
   */
  async createAgent(agent : any){
    let reponse = await fetch(this.BaseUrl2+"agent/register" ,  {
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

  searchAgent(agent : any) :Observable<any>{
    return  this.http.put(this.BaseUrl+"agent/search" , agent) ;
  }

  updateAgent(agent : Agent_1) : Observable<any>{

    return this.http.put(this.BaseUrl+"agent/update/"+agent.idAgent , agent)


  }

  deleteAgent(idAgent: any) : Observable<any> {
    return this.http.delete(this.BaseUrl+"agent/delete/"+idAgent) ;

  }



  /*_________________________________________________*/

  /**
   * reservation
   * @param reservation
   * */
  makeReservation(reservation : any) : Observable<any>{
    console.log(reservation);
      return this.http.post( "http://localhost:8081/tg/voyage_pro/reservation/auth/reservation/create" , reservation) ;
  }

  deleteReservation(id : number):Observable<any>{
      return this.http.delete(`http://localhost:8081/tg/voyage_pro/reservation/auth/reservation/delete/${id}`);
  }

  reservationAnnuleeForOne(email  : string):Observable<any>{
    return this.http.get(this.BaseUrl+"reservation/reservationAnnuleeForOne/"+email)
  }
  reservationAnnulee():Observable<any>{
    return this.http.get(this.BaseUrl+"reservation/reservationAnnulee" )
  }

  researchAnnuleeForOne(data : any) : Observable<any>{
    return  this.http.put(this.BaseUrl+ "reservation/researchForOneAnnulee" ,data ) ;
  }
  researchEnCoursForOne(data : any) : Observable<any>{
    return  this.http.put(this.BaseUrl+ "reservation/researchForOneEncours" ,data ) ;
  }
  researchAnnulee(data : any):Observable<any>{
    return  this.http.put(this.BaseUrl+ "reservation/researchAnnulee" ,data ) ;
  }
  researchEncours(data : any):Observable<any>{
    return  this.http.put(this.BaseUrl+ "reservation/researchEnCours" ,data ) ;
  }

  confirmation(id : number , email : string):Observable<any>{
    return this.http.get( `http://localhost:8081/tg/voyage_pro/reservation/auth/reservation/confirmation/${email}/${id}`) ;
  }

  reservationEnCoursForOne(email : string):Observable<any>{
    return  this.http.get(this.BaseUrl+ "reservation/reservationEnCoursForOne/"+email) ;
  }

  reservationEnCours():Observable<any>{
    return  this.http.get(this.BaseUrl+"reservation/reservationEnCours") ;
  }

  reservationData(mois :  number):Observable<any>{
      return this.http.get(this.BaseUrl+"reservation/dataByMonth/"+mois);
  }

  resParClient():Observable<any>{
      return this.http.get(this.BaseUrl+"reservation/reservationParClient")
  }

  allReservation() : Observable<any>{
    return this.http.get(this.BaseUrl+ "reservation/all") ;
  }

  getMyReservation(email : string):Observable<any>{
      return this.http.get("http://localhost:8081/tg/voyage_pro/reservation/auth/reservation/all/"+email) ;
  }


  researchReservationForOne(reservation : any):Observable<any>{
    return this.http.put("http://localhost:8081/tg/voyage_pro/reservation/auth/reservation/researchForOne" ,
      reservation) ;
  }

  generalResearchReservation(reservation : any):Observable<any>{
    return this.http.put("http://localhost:8081/tg/voyage_pro/reservation/auth/reservation/researchForOne" ,
      reservation) ;
  }
  annulation(id : number):Observable<any>{

      return this.http.get("http://localhost:8081/tg/voyage_pro/reservation/auth/reservation/annulation/"+id) ;
  }

  reservation_average():Observable<any>{
    return this.http.get(this.BaseUrl+"reservation/reservationRecentePourcentage")  ;

  }
  tauxAnnulation():Observable<any>{
    return this.http.get(this.BaseUrl+"reservation/tauxAnnulation") ; 
  }

  revenuMoyen():Observable<any>{
    return this.http.get(this.BaseUrl+"reservation/revenuMoyen") ; 
  }
  newEarnAverageReservation():Observable<any>{
    return this.http.get(this.BaseUrl+"reservation/newEarnPourcentage")  ;
  }

  gainTotal():Observable<any>{
      return this.http.get(this.BaseUrl+"reservation/gainTotal") ; 
  }




  ///tg/voyage_pro/reservation/auth/reservation


  /**
   *
   * @paiement
   * @returns
   */

  makePaiement(paiement  : any ):Observable<any>{
    console.log(paiement);
      return  this.http.post(this.BaseUrl+"paiement/makePaiement" , paiement) ;
  }

  getAllPaiement():Observable<any>{
      return this.http.get(this.BaseUrl+"paiement/all") ;
  }

  getAllPaiementForOne(email : string):Observable<any>{
    return this.http.get(this.BaseUrl+`paiement/getAllForOne/${email}`)
  }

  researchPaiement(data : any):Observable<any>{
      return this.http.put(this.BaseUrl+"paiement/research" , data);
  }
  researchPaiementForOne(data :any):Observable<any>{
    return this.http.put(this.BaseUrl+"paiement/researchForOne" , data);
  }

  deletePaiement(code :  string):Observable<any>{
      return this.http.delete(this.BaseUrl+"paiement/delete/"+code);
  }

  paiementRecent():Observable<any>{
    return  this.http.get(this.BaseUrl+"paiement/newPaiementAverage") ;
  }

}

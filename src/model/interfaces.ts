
export interface  Voyage{

  idVoyage : number ,
  departVoyage : string ,
  arriveVoyage : string ,
  dateVoyage : string ,
}


export interface Client_2{
  idClient :  number,
  nomClient : string ,
  prenomClient : string ,
  dateNaiss : string ,
  mailClient : string
  sexeClient : string ,
  telClient : string ,


}

export interface Agent_1{
  idAgent : number , 
  nomAgent : string , 
  prenomAgent : string , 
  dateNaiss : string , 
  mailAgent  : string, 
  sexeAgent : string , 
  telAgent : string 

}
export interface Agent_2 extends Agent_1{
  login : string , 
  password : string 
}



export interface Reservation_1{
  idReservation : number ,
  dateReservation : string ,
  client : Client_2 ,
  voyage : Voyage ,
}


export interface   Ticket{
  idTypeBillet : number  ,
  libelleTypeBillet : string ,
  prixTypeBillet:  number ,

}


export interface VIEW  {

  name : string , 
  isSelected : boolean ; 
 
  
}

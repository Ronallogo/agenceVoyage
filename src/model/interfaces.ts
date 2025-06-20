import { resourceUsage } from "process";

export interface  Voyage{

  idVoyage : number ,
  departVoyage : string ,
  arriveVoyage : string ,
  dateVoyage : string ,
  nbrPlaceDisponible : number
}


export function trierListeString(liste: string[]): string[] {
  return [...liste].sort((a, b) => a.localeCompare(b));
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






export interface   Ticket{
  idTypeBillet : number  ,
  libelleTypeBillet : string ,
  prixTypeBillet:  number ,

}


export interface VIEW  {

  name : string ,
  isSelected : boolean  ,
  authority :  string[]


}


export function samePassword(password : string , confirm : string):boolean{

    return  password === confirm ;
}
export function validatorPassword(password : string) : string{
  let result = "" ;
  const chiffres = /\d/; // Vérifie la présence de chiffres
  const speciaux = /[!@#$%^&*(),.?":{}|<>]/; // Vérifie la présence de caractères spéciaux
  const majuscules = /[A-Z]/; // Vérifie la présence de lettres majuscules

  return (
    chiffres.test(password) && speciaux.test(password) && majuscules.test(password) ? "111" :
    (chiffres.test(password) && majuscules.test(password) ) ? "11" : "1"
  );


}

export interface Reservation{
    idReservation : number  ,
    idClient : number  ,
    mailAgentAssocie : string ,
    idAgent : string ,
    idVoyage  :  number  ,
    idTypeBillet  :  number  ,
    libelleTypeBillet  :   string  ,
    nomAgent : string ,
    prenomAgent : string ,
    libelleVoyage : string,
    nomClient : string ,

    depart : string  ,
    arrivee : string ,
    prenomClient  : string,
    mailClient  : string,
    dateReservation : string ,
    nbrPlace : number ,
    status : string ,
    montant  : number ,
    telClient  : string ;
    telAgent : string















}


export interface user{
  username  :string ;
  email: string ;
  firstname : string ;
  lastname : string ;
  phone : string ;
  sexe : string ;
  roles :  any ;

}

export interface loginRequest{
    username :string ,
    password : string
}


export function numberToDate (timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
}



export function dateToNumber(time : string):number{
  const date = new Date("2025-06-08"); // YYYY-MM-DD
  const timestamp = Math.floor(date.getTime() / 1000);
  return timestamp ;
}

export const ROLE_PERMISSIONS = {
  admin: ['dashboard', 'clients', 'agents', 'reservation', 'billet', 'paiement'],
  agent: ['dashboard', 'voyage', 'clients', 'reservation'],
  client: ['dashboard', 'voyage', 'reservation', 'paiement']
};



export interface Paiement{
  codePaiement :string  ,

  idReservation  : number;

  idAgent : number ;
  nomAgent : string ;

  montant  :number ;
  libelleVoyage:number ;
  libelleTypeBillet :string ;
  datePaiement  : string,
  idClient : number  ,
  mailAgentAssocie : string ,
  idVoyage  :  number  ,
  idTypeBillet  :  number  ,
  prenomAgent : string ,
  nomClient : string ,
  depart : string  ,
  arrivee : string ,
  prenomClient  : string,
  mailClient  : string,
  dateReservation : string ,
  nbrPlace : number ,
  status : string ,
  telClient  : string ;
  telAgent : string ,
  dateVoyage : string


}







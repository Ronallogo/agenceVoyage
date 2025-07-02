import {Component, OnInit} from '@angular/core';
import {NgClass, NgFor} from "@angular/common";
import {ApplicationService} from "../../../service/application.service";
import {NgxPaginationModule} from "ngx-pagination";
import {Ticket, trierListeString, Voyage} from "../../../../model/interfaces";
import {getTodayDate, transformDate, VOYAGES} from "../../../../model/data";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {_confirmation, _error, _makeSure, _warning} from "../../../notification/notification";
import { forkJoin } from 'rxjs';




@Component({
  selector: 'app-voyage',
  imports: [
    NgClass,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule , 
    NgFor

  ],
  templateUrl: './voyage.component.html',
  standalone: true,
  styleUrl: './voyage.component.css'
})

export class VoyageComponent  implements  OnInit{


  protected voyages: Voyage[] = [];
  protected typesBillet: Ticket[] =[] ;
  protected villesDepart: string[] = [];
  protected villesArrivee:  string[] = [];
  protected recents    = 0 ; 

  protected nbrReservation = 0 ; 
  protected listTop3   : string[] = []



  searchVoyage() {
    if(
      this.voyageSearch.dateVoyage == undefined ||
      this.voyageSearch.departVoyage == undefined ||
      this.voyageSearch.arriveVoyage == undefined

    ){
        _warning("Veuillez saisir tous les données pour la recherche") ;
        return ;
    }
     this.service.researhForAgent(
         this.voyageSearch.departVoyage , 
      this.voyageSearch.arriveVoyage , 
         this.voyageSearch.dateVoyage
     ).subscribe(data=>{
            this.voyages= data ;
            console.log(data)

     } , err=>{
          _warning("Veuillez remplir tous les champs");
     }) ;
  }

  protected voyageSelected  = {departVoyage : "" , arriveVoyage : "" , dateVoyage : "" , nbrPace : 0}
  protected voyageSearch  = {departVoyage : "" , arriveVoyage : "" , dateVoyage : ""}

  protected entete: string[] = ["No" , "point de départ" , "point d'arrivée" , "Date de départ" , "Place disponibles"  ,"Actions"];
  
  currentPage: number = 0 ;
  protected  checkValue : boolean = false ;
  protected onUpdating : boolean  =   false;
  protected view: boolean = false

    protected indexedLocation !: number



  protected  formVoyage = new FormGroup({
    departVoyage  : new FormControl( "" , [Validators.required , Validators.minLength(3)  ]) ,
    arriveVoyage  : new FormControl( "" , [Validators.required , Validators.minLength(3) ]) ,
    dateVoyage : new FormControl(getTodayDate(), [Validators.required   ]) ,
    nbrPlaceDisponible : new  FormControl(1  , Validators.required)

  });


  constructor(protected service : ApplicationService) {
  }







  create(){

    this.formVoyage.getRawValue().departVoyage = String(this.formVoyage.controls. departVoyage) ;
    this.formVoyage.getRawValue().arriveVoyage = String(this.formVoyage.controls. arriveVoyage) ;
    this.formVoyage.getRawValue().dateVoyage =   transformDate(String(this.formVoyage.controls.dateVoyage));
    console.log(this.formVoyage.getRawValue());

    this.service.createVoyage(this.formVoyage.getRawValue()).subscribe(data=>{
        _confirmation("voyage enregistré avec succès 😊 !! ");
        console.log(data);
        this.listVoyageFunction();
    }  , err =>{
        console.log(err)
        _error("une erreur est survenue 😪") ;
    })
  }


  listVoyageFunction(){
        this.service.listVoyage().subscribe(data=>{
            this.voyages = data ;
           // console.log(data);
        }) ;
  }


  ngOnInit(): void {
      this.listVoyageFunction() ;
      this.getData() ; 
      this.getNbrReservation();
      this.recentVoyagesFunction();
      this.voyageTop3();
  }

  modifier(t: Voyage) {
    t.arriveVoyage = this.voyageSelected.arriveVoyage  ;
    t.dateVoyage = transformDate(this.voyageSelected.dateVoyage);
    t.departVoyage = this.voyageSelected.departVoyage ,
    t.dateVoyage = transformDate(this.voyageSelected.dateVoyage);
    t.nbrPlaceDisponible = this.voyageSelected.nbrPace
    console.log(t.dateVoyage);
    this.service.updateVoyage(t).subscribe(data=>{
      _confirmation("voyage modifier avec succès !!") ;
      this.listVoyageFunction() ;
      this.onUpdating = !this.onUpdating;
      this.listVoyageFunction() ;


    } , _error=>{
        _warning("verifier que les valeurs mises sont valides 😪 !!")
    })


  }

  delete(id_essence: any) {

  }

  pageChanged($event: number) {
    this.currentPage = $event ;
  }


  checkForm():boolean{
    return (

      (this.formVoyage.controls.departVoyage.invalid && this.formVoyage.controls.departVoyage.dirty) ||
      ( this.formVoyage.controls.arriveVoyage.invalid && this.formVoyage.controls.arriveVoyage.dirty) ||
      ( this.formVoyage.controls.arriveVoyage.invalid && this.formVoyage.controls.arriveVoyage.dirty)

    );
  }
  sameValue() : boolean{
    let value1 = String( this.formVoyage.get("departVoyage")?.value) ;
    let  value2 =  String(this.formVoyage.get('arriveVoyage')?.value) ;

    return value1.toLowerCase() == value2.toLowerCase() ;
  }

  indexLocationFunction(v : Voyage){
      this.indexedLocation = v.idVoyage;
      this.voyageSelected.departVoyage = v.departVoyage ;
      this.voyageSelected.arriveVoyage = v.arriveVoyage;
      this.voyageSelected.dateVoyage = v.departVoyage ;
  }

  listenUpdate(v:  Voyage) {
    this.onUpdating = !this.onUpdating;
    this.voyageSelected.departVoyage = v.departVoyage ;
    this.voyageSelected.arriveVoyage = v.arriveVoyage;
    this.voyageSelected.dateVoyage = v.departVoyage ;
  }

  cancelUpdate(){
    this.onUpdating = !this.onUpdating;
  }


  async deleteVoyage(id : number){
    let reponse = await     _makeSure("voulez-vous supprimer ce voyage??")   ;
    if(!reponse) return ;
      this.service.deleteVoyage(id).subscribe(data=>{
          _confirmation("voyage supprimer avec succès") ;
          this.listVoyageFunction();
      },err=>{
          _error("une erreur est survenue") ;
      })
  }




  getData(){

    forkJoin(
      {

        
        tickets : this.service.listTicket() ,
        departs : this.service.allDepart(),
        arrivees : this.service.allArrive()
      }
    ).subscribe(
      {
        next :({

                 tickets  ,
               
                departs ,
                arrivees
               })=>{
        

          this.villesDepart = trierListeString(departs as string[]) ;
          this.villesArrivee  = trierListeString(arrivees as string[]) ;




          this.typesBillet =  tickets ;

        }}) ;

     
  }

  

  getNbrReservation(){
    this.service.allReservation().subscribe(data=>{
    
        this.nbrReservation = data.length
    })
  }

  recentVoyagesFunction(){
    this.service.recentVoyages().subscribe(data=>{
        this.recents =  data.length
    })
  }

  voyageTop3(){
    this.service.voyageTop3().subscribe(data=>{
         this.listTop3 = data ; 
    } , err=> console.log(err.error));
  }


  

}

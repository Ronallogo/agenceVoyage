import {Component, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";
import {ApplicationService} from "../../service/application.service";
import {NgxPaginationModule} from "ngx-pagination";
import {Voyage} from "../../../model/interfaces";
import {getTodayDate, transformDate, VOYAGES} from "../../../model/data";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {_confirmation, _error, _makeSure, _warning} from "../../notification/notification";




@Component({
  selector: 'app-voyage',
  imports: [
    NgClass,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule

  ],
  templateUrl: './voyage.component.html',
  standalone: true,
  styleUrl: './voyage.component.css'
})
export class VoyageComponent  implements  OnInit{

  protected voyageSelected  = {departVoyage : "" , arriveVoyage : "" , dateVoyage : ""}

  protected entete: string[] = ["No" , "point de départ" , "point d'arrivée" , "Date de départ"  ,"Actions"];
  protected voyages: Voyage[]= VOYAGES;
  currentPage: number = 0 ;
  protected  checkValue : boolean = false ;
  protected onUpdating : boolean  =   false;
  protected view: boolean = false
  
    protected indexedLocation !: number
  
    

  protected  formVoyage = new FormGroup({
       departVoyage  : new FormControl( "" , [Validators.required , Validators.minLength(3)  ]) ,
       arriveVoyage  : new FormControl( "" , [Validators.required , Validators.minLength(3) ]) ,
      dateVoyage : new FormControl(getTodayDate(), [Validators.required   ])

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
  }

  modifier(t: Voyage) {
    t.arriveVoyage = this.voyageSelected.arriveVoyage  ; 
    t.dateVoyage = transformDate(this.voyageSelected.dateVoyage);
    t.departVoyage = this.voyageSelected.departVoyage , 
    t.dateVoyage = transformDate(this.voyageSelected.dateVoyage);
    console.log(t.dateVoyage);
    this.service.updateVoyage(t).subscribe(data=>{
      _confirmation("voyage modifier avec succès !!") ; 
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
      this.service.delete(id).subscribe(data=>{
          _confirmation("voyage supprimer avec succès") ;
          this.listVoyageFunction(); 
      },err=>{
          _error("une erreur est survenue") ; 
      })
  }
}

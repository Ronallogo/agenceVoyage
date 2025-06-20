import { Component, OnInit } from '@angular/core';
import {_warning} from "../../notification/notification";

@Component({
  selector: 'app-first-sight',
  imports: [],
  standalone : true ,
  templateUrl: './first-sight.component.html',
  styleUrl: './first-sight.component.css'
})
export class FirstSightComponent  implements OnInit{
  ngOnInit(): void {

  }
  askForConnexion() {
    _warning("Veuillez-vous connectez ou vous s'inscrire") ;
  }


}

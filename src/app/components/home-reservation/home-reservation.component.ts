import { Component } from '@angular/core';
import {_warning} from "../../notification/notification";

@Component({
  selector: 'app-home-reservation',
  imports: [],
  templateUrl: './home-reservation.component.html',
  standalone: true,
  styleUrl: './home-reservation.component.css'
})
export class HomeReservationComponent {
  askForConnexion() {
    _warning("Veuillez-vous connectez ou vous s'inscrire") ;
  }

}

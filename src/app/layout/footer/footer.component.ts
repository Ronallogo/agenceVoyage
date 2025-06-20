import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {_warning} from "../../notification/notification";

@Component({
  selector: 'app-footer',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './footer.component.html',
  standalone: true,
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  askForConnexion() {
      _warning("Veuillez-vous connectez ou vous s'inscrire") ;
  }
}

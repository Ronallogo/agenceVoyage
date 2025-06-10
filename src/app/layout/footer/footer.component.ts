import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

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

}

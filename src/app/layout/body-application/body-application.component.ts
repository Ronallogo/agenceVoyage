import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {ApplicationService} from "../../service/application.service";

@Component({
  selector: 'app-body-application',
  imports: [
    RouterOutlet
  ],
  templateUrl: './body-application.component.html',
  standalone: true,
  styleUrl: './body-application.component.css'
})
export class BodyApplicationComponent  implements OnInit{
  protected view  :string  = "" ;
  constructor(protected service : ApplicationService) {
  }

  ngOnInit(): void {
      this.view = this.service.view ;
  }


}

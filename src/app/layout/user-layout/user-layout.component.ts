import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BodyApplicationComponent } from '../body-application/body-application.component';
import {LoadingComponent} from "../../components/loading/loading.component";
import {ApplicationService} from "../../service/application.service";

@Component({
  selector: 'app-user-layout',
  imports: [NavBarComponent, SidebarComponent, BodyApplicationComponent, LoadingComponent],
  templateUrl: './user-layout.component.html',
  standalone: true,
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {

    constructor(protected service : ApplicationService) {
    }
}

import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BodyApplicationComponent } from '../body-application/body-application.component';

@Component({
  selector: 'app-agent-layout',
  imports: [NavBarComponent, SidebarComponent, BodyApplicationComponent],
  templateUrl: './agent-layout.component.html',
  standalone: true,
  styleUrl: './agent-layout.component.css'
})
export class AgentLayoutComponent {

}

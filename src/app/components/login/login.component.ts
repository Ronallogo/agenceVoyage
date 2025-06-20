import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import { AuthenticationService } from "../../service/authentication.service";
import { Router } from "@angular/router";
import { ApplicationService } from "../../service/application.service";
import { IndexedDbService } from '../../service/indexed-db.service';
import {NgIf} from "@angular/common";
import {_error} from "../../notification/notification";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  protected errorFound: boolean = false;

  protected formUser = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    protected service: ApplicationService,
    protected auth: AuthenticationService,
    protected router: Router,
    private indexedDBService: IndexedDbService
  ) {}

  async login() {
    this.auth.login({
      username: this.formUser.getRawValue().username,
      password: this.formUser.getRawValue().password
    }).subscribe(async data => {
      try {
        this.errorFound = false;
        const user = this.auth.getUser(data.access_token);

        await this.indexedDBService.setUser({id : 0 ,...user });
        this.service.user = await this.indexedDBService.getUser()

        console.log(this.service.user);


        if (this.service.user !== undefined) {
          await this.router.navigate(['/user/profile']);
        }

      } catch (e) {
        console.error('Erreur de stockage IndexedDB', e);
      }
    }, err => {
      console.log(err);
      this.errorFound = true;
     // this.indexedDBService.deleteUser('user');
    });
  }

  ngOnInit(): void {}
}

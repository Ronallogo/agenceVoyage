import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

import { Observable } from 'rxjs';
import { user } from '../../model/interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  public getUser(data : string){
    let objJwt  = jwtDecode(data) ;
    console.log(objJwt) ;
    return objJwt  ;
  }



  private BaseUrl : string = "https://reservation-pro-latest.onrender.com/tg/voyage_pro/reservation/";

  constructor(private http : HttpClient) { }


  login(request:  {username : string , password : string}) :Observable<any> {
   return this.http.post(this.BaseUrl+"client/auth", request) ;
  }


  async registerClient(registeClient : any){
    let response = await fetch(this.BaseUrl+"" ,{

      } )
  }
  update(data : {
    firstname : string,
    lastname : string ,
    phone  :  string ,
    email : string
  } , role : string , current_email : string) : Observable<any>
  {
    console.log(role +" " + current_email);
      return this.http.put(this.BaseUrl+"user/update/"+role+"/"+current_email , data) ;
  }
}

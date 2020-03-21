import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient, private _router : Router) { }

  isLoggedIn = false;

  login(username: string, password:string){
    //hacer una llamada POST a mi API mandando los datos
    this._http.post("http://localhost:3000/login", {
      "username": username,
      "password": password
    })
    .subscribe((responseAPI) => {
      if (environment.production === false){
        document["cookies"] = `sello=${responseAPI["token"]}`
      }
      this.isLoggedIn = true;
      this._router.navigateByUrl("/alerts");
    })
  }

  register(username: string, password: string, email: string){
    this._http.post("http://localhost:3000/user", {
      "username": username,
      "password": password,
      "email": email
    })
    .subscribe((responseAPI) => {
      this.login(username, password);
    })
  }

  delete_cookie(name: string) {
    document["cookies"] = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  logout(){
    this.isLoggedIn = false;
    this.delete_cookie("sello");
    this._router.navigateByUrl("/login");
  }

}

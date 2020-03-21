import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  constructor(private _user: UserService, private _http: HttpClient) { }

  logout(){
    this._user.logout();
  }

  alertas: object;

  ngOnInit() {
    this._http.get("http://localhost:3000/alerts", {withCredentials: true})
    .subscribe((responseAPI) => {
      this.alertas = responseAPI;
    })
  }

}

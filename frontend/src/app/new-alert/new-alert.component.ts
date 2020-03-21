import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-alert',
  templateUrl: './new-alert.component.html',
  styleUrls: ['./new-alert.component.css']
})
export class NewAlertComponent implements OnInit {

  constructor(private _http: HttpClient, private _router: Router) { }

  calle: string;
  tipoIncidencia: string;

  postNewAlert(){
    //llamada al backend de tipo POST
    this._http.post("http://localhost:3000/alert", {
      "calle": this.calle,
      "tipoIncidencia": this.tipoIncidencia
    }, {withCredentials: true})
    .subscribe((responseAPI) => {
      this._router.navigateByUrl("/alerts")
    })
  }

  ngOnInit() {
  }

}

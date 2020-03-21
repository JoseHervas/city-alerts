import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private _user: UserService ) { }

  //Template-driven forms
  username: string;
  password: string;

  sendForm(){
    this._user.login(this.username, this.password)
  }

  ngOnInit() {
  }

}

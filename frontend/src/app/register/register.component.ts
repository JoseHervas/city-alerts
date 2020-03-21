import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _user: UserService) { }

  username: string;
  password: string;
  email: string;

  submitForm(){
    this._user.register(this.username, this.password, this.email)
  }

  ngOnInit() {
  }

}

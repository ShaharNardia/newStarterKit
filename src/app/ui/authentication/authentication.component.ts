import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(private auth: UserService, private route: Router) { }
  IsAuth;
  ngOnInit() {
  }
  fbLogin() {
    //this.auth.isAuthReturn(true);
    this.auth.currentAuthState.subscribe(isauth => this.IsAuth = isauth);
    this.newMessage();
    this.route.navigate(['pages/homepage']);
  }

  newMessage() {
    this.auth.isAuth(true);
  }

  googleLogin() {
    //this.auth.isAuthReturn(true);
    //this.auth.login();
  }
}




import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private auth: UserService) { }
  IsAuth;
  ngOnInit() {
    this.auth.currentAuthState.subscribe(isauth => this.IsAuth = isauth);
  }

  logOff() {
    this.auth.isAuth(false);
  }

}

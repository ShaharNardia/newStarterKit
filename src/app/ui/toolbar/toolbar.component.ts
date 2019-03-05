import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  notificationsNumber: number;

  constructor(private router: ActivatedRoute, private auth: UserService) { }
  searchparam = '';
  isAuthenticated;
  avatar;
  userName;
  message;
  toggle = 'keyboard_arrow_down';
  IsToggled = false;
  BadgeHidden;

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.searchparam = params['SearchTerm'];

      this.auth.currentAuthState.subscribe(isauth => {
        this.isAuthenticated = isauth;
        this.handleHeader();
      })
    });
  }
  handleHeader() {
    if (this.isAuthenticated) {
      this.avatar = 'https://lh3.googleusercontent.com/-16sGQ9quJg8/AAAAAAAAAAI/AAAAAAAAAAA/AGDgw-heot4XN7oPmoa10DOFR00eznt4rw/s64-c-mo/photo.jpg';
      this.userName = 'Shahar Nardia'.toLowerCase();
      this.notificationsNumber = 15;
      this.handleNotifications();
    }
  }
  toggleIt() {
    this.IsToggled = !this.IsToggled;

    if (!this.IsToggled) {
      this.toggle = 'keyboard_arrow_down';
      console.log(this.IsToggled + ' is false');
    }
    else {
      this.toggle = 'keyboard_arrow_up';
      console.log(this.IsToggled + ' is true');
    }
  }
  goToNotificList() {
    this.notificationsNumber = 0;
    this.handleNotifications();
  }

  handleNotifications() {
    if (this.notificationsNumber < 1) {
      //console.log(this.notificationsNumber);
      this.BadgeHidden = false;
    }
    else {
      console.log(this.notificationsNumber);
      this.BadgeHidden = 'visible';
      console.log(this.BadgeHidden);
    }
  }
}
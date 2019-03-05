import { Component, OnInit, Input } from '@angular/core';
import { SubscribeSrvcService } from 'src/app/services/subscribe-srvc.service';

@Component({
  selector: 'app-subscribe-btn',
  templateUrl: './subscribe-btn.component.html',
  styleUrls: ['./subscribe-btn.component.css']
})
export class SubscribeBtnComponent implements OnInit {
  @Input() subval;
  @Input() subtype;
  Subscribe;
  notifications;
  isSubscribedTo;
  opacity;
  bckColor;

  constructor(private subscribed: SubscribeSrvcService) {
    this.isSubscribedTo = this.subscribed.isSubscribed;
  }

  ngOnInit() {
    this.handleButton();
    //this.Subscribe = 'Subscribe';
  }

  handleButton() {
    if (!this.isSubscribedTo) {
      this.Subscribe = 'UnSubscribe';
      this.notifications = 'notifications_off';
      this.bckColor = 'darkgray';
      this.opacity = 0.5;
    } else {
      this.Subscribe = 'Subscribe';
      this.notifications = 'notifications';
      this.bckColor = 'blueviolet';
      this.opacity = 1;
    }
  }

  click() {
    if (!this.isSubscribedTo) {
      this.isSubscribedTo = true;
      this.subscribed.unSubscribeTo(this.subtype,this.subval);
      this.handleButton();
    }
    else {
      this.isSubscribedTo = false;
      this.subscribed.subscribeTo(this.subtype,this.subval);
      this.handleButton();
    }
  }


}

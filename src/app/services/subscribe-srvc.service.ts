import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubscribeSrvcService {
  
  isSubscribed;
  constructor() {
    this.isSubscribed = true;
  }

  subscribeTo(type, val){
    console.log(`subsribe to ${type} - ${val}`);
  }

  unSubscribeTo(type, val) {
    console.log(`Unsubsribe to ${type} - ${val}`);
  }
}

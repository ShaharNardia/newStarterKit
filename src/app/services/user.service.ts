import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isAuthParam = new BehaviorSubject(false);
  currentAuthState = this.isAuthParam.asObservable();
  userNameAuth: any;

  constructor() { }

  isAuth(bool) {
    this.isAuthParam.next(bool);
    this.userNameAuth = 'Shahar Nardia'.toLocaleLowerCase();
  }

}

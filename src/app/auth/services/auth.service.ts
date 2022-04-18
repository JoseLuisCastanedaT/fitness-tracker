import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthDataInterface } from '../types/authData.interface';
import { UserInterface } from '../types/user.interface';

@Injectable()
export class AuthService {

  private user: UserInterface;

  constructor(private router: Router) {}

  //'Subject' Emits an event (Observable of type boolean)
  authChanges = new Subject<boolean>();

  registerUser(authData: AuthDataInterface) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authSuccessfully()
  }

  login(authData: AuthDataInterface) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authSuccessfully()
  }

  logout(){
      this.user = null;
      this.authChanges.next(false);
      this.router.navigate(['/login'])
  }
  
  getUser() {
      return {... this.user}
  }

  isAuth() {
      return this.user != null
  }

  private authSuccessfully() {
    this.authChanges.next(true);
    this.router.navigate(['/training'])
  }
}
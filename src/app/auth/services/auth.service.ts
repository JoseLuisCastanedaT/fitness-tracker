import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { onAuthStateChanged } from 'firebase/auth';
import { Subject } from 'rxjs';
import { UIService } from 'src/app/shared/services/ui.service';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from 'src/app/store/actions/login.action';
import { logoutAction } from 'src/app/store/actions/logout.action';
import {
  signupAction,
  signupFailureAction,
  signupSuccessAction,
} from 'src/app/store/actions/signup.action';
import { AppStateInterface } from 'src/app/store/types/appState.interface';

import { AuthDataInterface } from '../types/authData.interface';

@Injectable()
export class AuthService {

  constructor(
    private router: Router,
    private auth: Auth,
    private uiService: UIService,
    private store: Store<AppStateInterface>
  ) {}

  initializeAuthListener() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.router.navigate(['/training']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthDataInterface) {
    this.store.dispatch(signupAction());

    createUserWithEmailAndPassword(this.auth, authData.email, authData.password)
      .then((result) => {
        this.store.dispatch(signupSuccessAction());
      })
      .catch((error) => {
        this.store.dispatch(signupFailureAction());
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  login(authData: AuthDataInterface) {
    this.store.dispatch(loginAction());

    signInWithEmailAndPassword(this.auth, authData.email, authData.password)
      .then((result) => {
        this.store.dispatch(loginSuccessAction());
      })
      .catch((error) => {
        this.store.dispatch(loginFailureAction());
        if (error.message === 'Firebase: Error (auth/wrong-password).') {
          this.uiService.showSnackbar('Invalid password.', null, 3000);
        } else if (error.message === 'Firebase: Error (auth/user-not-found).') {
          this.uiService.showSnackbar('Invalid username.', null, 3000);
        } else {
          this.uiService.showSnackbar(error.message, null, 3000);
        }
      });
  }

  logout() {
    this.store.dispatch(logoutAction());
    this.auth.signOut();
  }

}

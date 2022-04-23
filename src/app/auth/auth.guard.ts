import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs';

import { isAuthenticatedSelector } from '../store/selectors';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private store: Store, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.pipe(select(isAuthenticatedSelector)).pipe(take(1));
  }

  canLoad(route: Route) {
    return this.store.pipe(select(isAuthenticatedSelector)).pipe(take(1));
  }
}

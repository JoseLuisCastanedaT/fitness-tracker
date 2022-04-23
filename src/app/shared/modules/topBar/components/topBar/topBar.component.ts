import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import { isAuthenticatedSelector } from 'src/app/store/selectors';


@Component({
  selector: 'ft-topbar',
  templateUrl: './topBar.component.html',
  styleUrls: ['./topBar.component.css'],
})
export class TopBarComponent implements OnInit {
  isAuth$: Observable<boolean>;
  authSubscription: Subscription;
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private store: Store, private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuth$ = this.store.pipe(select(isAuthenticatedSelector))
  }

  onLogout() {
    this.authService.logout();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}

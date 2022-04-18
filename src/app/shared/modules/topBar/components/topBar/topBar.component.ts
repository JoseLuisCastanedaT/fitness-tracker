import { Component, OnDestroy, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'ft-topbar',
  templateUrl: './topBar.component.html',
  styleUrls: ['./topBar.component.css'],
})
export class TopBarComponent implements OnInit, OnDestroy {
  isAuth: boolean = false;
  authSubscription: Subscription;
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authChanges.subscribe((authStatus) => {
      this.isAuth = authStatus;
    });
  }

  ngOnDestroy(): void {
      this.authSubscription.unsubscribe()
  }

  onLogout() {
    this.authService.logout();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}

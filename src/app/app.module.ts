import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AuthModule } from './auth/auth.module';
import { TrainingModule } from './training/training.module';
import { WelcomeModule } from './welcome/welcome.module';
import { TopBarModule } from './shared/modules/topBar/topBar.module';
import { SidenavModule } from './shared/modules/sidenav/sidenav.module';
import { AuthService } from './auth/services/auth.service';
import { TrainingService } from './training/services/training.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    WelcomeModule,
    AuthModule,
    TrainingModule,
    TopBarModule,
    SidenavModule
  ],
  providers: [AuthService, TrainingService],
  bootstrap: [AppComponent]
})
export class AppModule { 
}

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import {MatSidenavModule} from '@angular/material/sidenav'; 
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
    imports: [CommonModule, MatSidenavModule, FlexLayoutModule],
    declarations: [WelcomeComponent],
    exports: [WelcomeComponent]
})
export class WelcomeModule {}
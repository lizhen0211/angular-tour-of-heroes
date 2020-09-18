import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import {FormsModule} from "@angular/forms";
import { DrawerComponent } from './drawer/drawer.component';
import { ShapeDrawerDirective } from './shape-drawer.directive';
@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    DrawerComponent,
    ShapeDrawerDirective
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

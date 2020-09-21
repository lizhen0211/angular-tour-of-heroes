import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import {FormsModule} from "@angular/forms";
import { DrawerComponent } from './drawer/drawer.component';
import { ShapeDrawerDirective } from './shape-drawer.directive';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);
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
        FormsModule,
        IconsProviderModule,
        NzLayoutModule,
        NzMenuModule,
        HttpClientModule,
        BrowserAnimationsModule
    ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }

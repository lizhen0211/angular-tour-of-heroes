import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HeroesComponent} from "./heroes/heroes.component";
import {DrawerComponent} from "./drawer/drawer.component";

const routes: Routes = [{path: 'heroes', component: HeroesComponent},
  {path: 'drawer', component: DrawerComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

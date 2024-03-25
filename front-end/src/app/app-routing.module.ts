import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Template } from './config/template.component';
import { StatistiquesDisplayerComponent } from './statistiques/statistiques-displayer/statistiques-displayer.component';
import { PageNavComponent } from './nav/pageNav.component';
import { AjoutImage } from './ajoutImage/ajoutImage.component';

const routes: Routes = [
  {path : "play", component: Template},
  {path : "stats", component: StatistiquesDisplayerComponent},
  {path : "nav", component : PageNavComponent},
  {path : "ajoutImage", component : AjoutImage},
  {path: '', redirectTo : '/nav', pathMatch : "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

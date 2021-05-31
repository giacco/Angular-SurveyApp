import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { GoodbyeComponent } from './goodbye/goodbye.component'
import { SurveyComponent } from './survey/survey.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path :'goodbye', component: GoodbyeComponent },
  { path: 'survey' , component: SurveyComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 

import { WelcomeComponent } from './welcome/welcome.component';
import { GoodbyeComponent } from './goodbye/goodbye.component';
import { SurveyComponent } from './survey/survey.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    GoodbyeComponent,
    SurveyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    AppRoutingModule,
    MatRadioModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTableModule,
    MatIconModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

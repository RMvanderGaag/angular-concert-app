import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModlue } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent, SharedModule } from "@angular-concert-project/shared";
import { ConcertOverviewComponent } from './pages/concert-page/concert-overview/concert-overview.component';
import { FormsModule } from '@angular/forms';
import { ConcertDetailComponent } from './pages/concert-page/concert-detail/concert-detail.component';
import { ConcertEditComponent } from './pages/concert-page/concert-edit/concert-edit.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent, ConcertOverviewComponent, ConcertDetailComponent, ConcertEditComponent],
  providers: [],
  bootstrap: [AppComponent],
  imports: [AppRoutingModlue, RouterModule, BrowserModule, HttpClientModule, SharedModule, FormsModule]
})
export class AppModule { }

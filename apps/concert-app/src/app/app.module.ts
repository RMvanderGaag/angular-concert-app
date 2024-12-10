import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModlue } from './app-routing.module';

import { AppComponent } from './app.component';
import { SharedModule } from '@angular-concert-project/shared';
import { ConcertOverviewComponent } from './pages/concert-page/concert-overview/concert-overview.component';
import { FormsModule } from '@angular/forms';
import { ConcertDetailComponent } from './pages/concert-page/concert-detail/concert-detail.component';
import { ConcertEditComponent } from './pages/concert-page/concert-edit/concert-edit.component';
import { RouterLink, RouterModule } from '@angular/router';
import { UserOverviewComponent } from './pages/user-page/user-overview/user-overview.component';
import { UserDetailComponent } from './pages/user-page/user-detail/user-detail.component';
import { UserEditComponent } from './pages/user-page/user-edit/user-edit.component';
import { ArtistOverviewComponent } from './pages/artist-page/artist-overview/artist-overview.component';
import { ArtistDetailComponent } from './pages/artist-page/artist-detail/artist-detail.component';
import { ArtistEditComponent } from './pages/artist-page/artist-edit/artist-edit.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login-page/login.component';
import { RegisterComponent } from './pages/register-page/register.component';

@NgModule({
  imports: [
    AppRoutingModlue,
    SharedModule,
    RouterModule,
    RouterLink,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
  ],
  declarations: [
    AppComponent,
    ConcertOverviewComponent,
    ConcertDetailComponent,
    ConcertEditComponent,
    UserOverviewComponent,
    UserEditComponent,
    UserDetailComponent,
    ArtistOverviewComponent,
    ArtistDetailComponent,
    ArtistEditComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}

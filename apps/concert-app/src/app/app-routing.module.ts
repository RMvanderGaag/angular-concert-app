import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConcertOverviewComponent } from './pages/concert-page/concert-overview/concert-overview.component';
import { ConcertEditComponent } from './pages/concert-page/concert-edit/concert-edit.component';
import { ConcertDetailComponent } from './pages/concert-page/concert-detail/concert-detail.component';
import { UserOverviewComponent } from './pages/user-page/user-overview/user-overview.component';
import { UserEditComponent } from './pages/user-page/user-edit/user-edit.component';
import { UserDetailComponent } from './pages/user-page/user-detail/user-detail.component';
import { AboutComponent } from './pages/about-page/about.component';
import { ArtistOverviewComponent } from './pages/artist-page/artist-overview/artist-overview.component';
import { ArtistEditComponent } from './pages/artist-page/artist-edit/artist-edit.component';
import { ArtistDetailComponent } from './pages/artist-page/artist-detail/artist-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login-page/login.component';
import { RegisterComponent } from './pages/register-page/register.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent },

    { path: 'concerts', pathMatch: 'full', component: ConcertOverviewComponent },
    { path: 'concerts/new', pathMatch: 'full', component: ConcertEditComponent },
    { path: 'concerts/:id', pathMatch: 'full', component: ConcertDetailComponent },
    { path: 'concerts/:id/edit', pathMatch: 'full', component: ConcertEditComponent },
    
    { path: 'users', pathMatch: 'full', component: UserOverviewComponent },
    { path: 'users/new', pathMatch: 'full', component: UserEditComponent },
    { path: 'users/:id', pathMatch: 'full', component: UserDetailComponent },
    { path: 'users/:id/edit', pathMatch: 'full', component: UserEditComponent },

    { path: 'artists', pathMatch: 'full', component: ArtistOverviewComponent },
    { path: 'artists/new', pathMatch: 'full', component: ArtistEditComponent },
    { path: 'artists/:id', pathMatch: 'full', component: ArtistDetailComponent },
    { path: 'artists/:id/edit', pathMatch: 'full', component: ArtistEditComponent },

    { path: 'login', pathMatch: 'full', component: LoginComponent },
    { path: 'register', pathMatch: 'full', component: RegisterComponent },


    { path: 'about', pathMatch: 'full', component: AboutComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModlue { }
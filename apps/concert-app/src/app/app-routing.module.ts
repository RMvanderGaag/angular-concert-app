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
import { AdminGuard, UserGuard } from '@angular-concert-project/shared';
import { TicketOverviewComponent } from './pages/ticket-page/ticket-overview/ticket-overview.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './pages/profile/edit-profile/edit-profile.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'login', pathMatch: 'full', component: LoginComponent },
    { path: 'register', pathMatch: 'full', component: RegisterComponent },
    { path: 'about', pathMatch: 'full', component: AboutComponent },

    { path: 'concerts', pathMatch: 'full', component: ConcertOverviewComponent },
    { path: 'concerts/new', pathMatch: 'full', component: ConcertEditComponent, canActivate: [AdminGuard] },
    { path: 'concerts/:id', pathMatch: 'full', component: ConcertDetailComponent },
    { path: 'concerts/:id/edit', pathMatch: 'full', component: ConcertEditComponent, canActivate: [AdminGuard] },
    
    { path: 'users', pathMatch: 'full', component: UserOverviewComponent, canActivate: [AdminGuard] },
    { path: 'users/new', pathMatch: 'full', component: UserEditComponent, canActivate: [AdminGuard] },
    { path: 'users/:id', pathMatch: 'full', component: UserDetailComponent, canActivate: [AdminGuard] },
    { path: 'users/:id/edit', pathMatch: 'full', component: UserEditComponent, canActivate: [AdminGuard] },

    { path: 'artists', pathMatch: 'full', component: ArtistOverviewComponent },
    { path: 'artists/new', pathMatch: 'full', component: ArtistEditComponent, canActivate: [AdminGuard] },
    { path: 'artists/:id', pathMatch: 'full', component: ArtistDetailComponent },
    { path: 'artists/:id/edit', pathMatch: 'full', component: ArtistEditComponent, canActivate: [AdminGuard] },

    
    { path: 'tickets', pathMatch: 'full', component: TicketOverviewComponent, canActivate: [UserGuard] },
    { path: 'profile', pathMatch: 'full', component: ProfileComponent, canActivate: [UserGuard] },
    { path: 'profile/edit', pathMatch: 'full', component: EditProfileComponent, canActivate: [UserGuard] },



	{ path: '**', pathMatch: 'full', component: HomeComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModlue { }
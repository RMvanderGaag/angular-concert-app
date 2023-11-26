import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@angular-concert-project/user';
import { RegisterComponent } from '@angular-concert-project/user';
import { HomeComponent } from '@angular-concert-project/shared';
import { ConcertOverviewComponent } from './pages/concert-page/concert-overview/concert-overview.component';
import { ConcertEditComponent } from './pages/concert-page/concert-edit/concert-edit.component';
import { ConcertDetailComponent } from './pages/concert-page/concert-detail/concert-detail.component';
import { UserOverviewComponent } from './pages/user-page/user-overview/user-overview.component';
import { UserEditComponent } from './pages/user-page/user-edit/user-edit.component';
import { UserDetailComponent } from './pages/user-page/user-detail/user-detail.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent },

    { path: 'concerts', pathMatch: 'full', component: ConcertOverviewComponent },
    { path: 'concerts/new', pathMatch: 'full', component: ConcertEditComponent },
    { path: 'concerts/:id', pathMatch: 'full', component: ConcertDetailComponent },
    { path: 'concerts/:id/edit', pathMatch: 'full', component: ConcertEditComponent },

    { path: 'register', pathMatch: 'full', component: RegisterComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModlue { }
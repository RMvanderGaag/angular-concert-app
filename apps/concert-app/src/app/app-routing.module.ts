import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@angular-concert-project/user';
import { RegisterComponent } from '@angular-concert-project/user';
import { HomeComponent } from '@angular-concert-project/shared';
import { ConcertOverviewComponent } from '@angular-concert-project/concert';
import { ConcertAddEditComponent } from 'libs/concert/src/lib/concert-add-edit/concert-add-edit.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'login', pathMatch: 'full', component: LoginComponent },
    { path: 'register', pathMatch: 'full', component: RegisterComponent },
    { path: 'concerts', pathMatch: 'full', component: ConcertOverviewComponent },
    { path: 'concert-add', pathMatch: 'full', component: ConcertAddEditComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModlue { }
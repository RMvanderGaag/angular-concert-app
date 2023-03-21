import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { UserModule } from '@angular-concert-project/user';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [CommonModule, UserModule, RouterModule],
  declarations: [
    NavbarComponent,
    HomeComponent,
    FooterComponent,
  ],
  exports: [NavbarComponent, FooterComponent],
})
export class SharedModule { }

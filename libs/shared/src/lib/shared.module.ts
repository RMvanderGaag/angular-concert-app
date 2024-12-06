import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserModule } from '@angular-concert-project/user';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [CommonModule, UserModule, RouterModule],
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  exports: [NavbarComponent, FooterComponent, ],
})
export class SharedModule { }

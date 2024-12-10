import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  exports: [NavbarComponent, FooterComponent, ],
})
export class SharedModule { }

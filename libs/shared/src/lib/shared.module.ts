import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { UserInfoComponent } from './components/user/user-info/user-info.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    NavbarComponent,
    FooterComponent,
    ErrorComponent,
    UserInfoComponent,
  ],
  exports: [NavbarComponent, FooterComponent, ErrorComponent, UserInfoComponent],
})
export class SharedModule {}

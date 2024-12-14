import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { UserInfoComponent } from './components/user/user-info/user-info.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  declarations: [
    NavbarComponent,
    FooterComponent,
    ErrorComponent,
    UserInfoComponent,
    UserUpdateComponent,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    ErrorComponent,
    UserInfoComponent,
    UserUpdateComponent
  ],
})
export class SharedModule {}

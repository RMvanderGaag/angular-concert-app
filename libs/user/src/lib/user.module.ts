import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AccountComponent } from './account/account.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [RegisterComponent, LoginComponent, AccountComponent],
  exports: [RegisterComponent, LoginComponent, AccountComponent],
})
export class UserModule { }

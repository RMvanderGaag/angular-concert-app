import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModlue } from './app-routing.module';

import { AppComponent } from './app.component';
import { SharedModule } from "@angular-concert-project/shared";

@NgModule({
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
  imports: [BrowserModule, AppRoutingModlue, HttpClientModule, SharedModule]
})
export class AppModule { }

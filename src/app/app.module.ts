import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {VisaCostComponent} from "./components/VisaCostComponent/VisaCost.component";
import {VisaCostItemComponent} from "./components/VisaCostItemComponent/VisaCostItem.component";

@NgModule({
  declarations: [
    AppComponent,
    VisaCostComponent,
    VisaCostItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

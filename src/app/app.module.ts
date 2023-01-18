import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {VisaCostComponent} from "./components/VisaCostComponent/VisaCost.component";
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { EditNumericComponent } from './components/edit-numeric/edit-numeric.component';
import {ɵEmptyOutletComponent} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {FilteredColumnsComponent} from "./components/filteredcolumns/filteredcolumns.component";


@NgModule({
  declarations: [
    AppComponent,
    VisaCostComponent,
    EditNumericComponent,
    FilteredColumnsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatTableModule,
    DragDropModule,
    ɵEmptyOutletComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

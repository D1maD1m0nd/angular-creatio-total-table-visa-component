import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {VisaCostComponent} from "./components/VisaCostComponent/VisaCost.component";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSortModule} from '@angular/material/sort';
import {EditNumericComponent} from './components/edit-numeric/edit-numeric.component';
import {ɵEmptyOutletComponent} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {FilteredColumnsComponent} from "./components/filteredcolumns/filteredcolumns.component";
import {ResizeColumnDirective} from "./directives/resize-column.directive";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatCardModule} from "@angular/material/card";
import {NgModule} from "@angular/core";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {TitleVisaTableComponent} from './components/title-visa-table/title-visa-table.component';

@NgModule({
    declarations: [
        AppComponent,
        VisaCostComponent,
        EditNumericComponent,
        FilteredColumnsComponent,
        ResizeColumnDirective,
        TitleVisaTableComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatSortModule,
        MatTableModule,
        DragDropModule,
        ɵEmptyOutletComponent,
        MatCheckboxModule,
        MatCardModule,
        MatExpansionModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

}

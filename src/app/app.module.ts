import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSortModule} from '@angular/material/sort';
import {EditNumericComponent} from './components/edit-numeric/edit-numeric.component';
import {MatTableModule} from "@angular/material/table";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {FilterColumnComponent} from "./components/filter-column/filter-column.component";
import {ResizeColumnDirective} from "./directives/resize-column.directive";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatCardModule} from "@angular/material/card";
import {ApplicationRef, DoBootstrap, Injector, NgModule} from "@angular/core";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {createCustomElement} from '@angular/elements';
import {VltSummaryVisaCostComponent} from "./components/summary-visa-cost/vlt-summary-visa-cost.component";
import {TitleVisaComponent} from "./components/title-visa/title-visa.component";
import {VisaCostTableComponent} from "./components/visa-cost-table/visa-cost-table.component";

@NgModule({
    declarations: [
        AppComponent,
        VisaCostTableComponent,
        EditNumericComponent,
        FilterColumnComponent,
        ResizeColumnDirective,
        TitleVisaComponent,
        VltSummaryVisaCostComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatSortModule,
        MatTableModule,
        DragDropModule,
        MatCheckboxModule,
        MatCardModule,
        MatExpansionModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule implements DoBootstrap {
    constructor(private injector: Injector) {
    }

    ngDoBootstrap(appRef: ApplicationRef): void {
        const el = createCustomElement(VltSummaryVisaCostComponent, {injector: this.injector});
        customElements.define('vlt-summary-visa-cost-component', el);
    }
}

import {Component, OnInit} from '@angular/core';
import {CostItems} from "./components/data/mock/ItemCosts";
import {CostItemsColumns} from "./components/data/mock/ItemColumns";
import {ApiService} from "./services/apiservice.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    itemCosts = CostItems
    itemColumns = CostItemsColumns

    constructor(public apiService: ApiService) {
    }

    ngOnInit(): void {
        this.apiService.GetVisaSummary().subscribe((i) => {
            console.log(i);
        })
    }
}

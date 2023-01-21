import {Component, OnInit} from '@angular/core';
import {CostItems} from "./components/data/mock/ItemCosts";
import {CostItemsColumns} from "./components/data/mock/ItemColumns";
import {ApiService} from "./services/apiservice.service";
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    itemCosts = CostItems
    itemColumns = CostItemsColumns

    constructor(public apiService: ApiService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {

        const params = new URLSearchParams(window.location.search);
        const yearId = params.get('YearId');
        const brandId = params.get('BrandId');
        console.log(yearId)
        console.log(brandId)
        //?YearId=42533c5f-b173-4386-a1d9-8e02e5b91d4d&BrandId=f4c9e1ef-167e-4aef-b2c1-56950486df79
        this.apiService.GetVisaSummary(yearId, brandId).subscribe((i) => {
            console.log(i);
        })
    }
}

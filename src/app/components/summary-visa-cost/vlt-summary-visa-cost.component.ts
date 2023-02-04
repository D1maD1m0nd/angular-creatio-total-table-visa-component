import {Component, Input, OnInit} from '@angular/core';
import {IVisaCostSummary} from "../../data/model/response/VisaCostSummary";
import {ApiService} from "../../services/apiservice.service";

@Component({
    selector: 'vlt-summary-visa-cost-component',
    templateUrl: './vlt-summary-visa-cost.component.html',
    styleUrls: ['./vlt-summary-visa-cost.component.css']
})
export class VltSummaryVisaCostComponent implements OnInit {
    VisaCostSummary: IVisaCostSummary
    @Input('year') year: string
    @Input("brand") brand: string

    VisaCostSummarySave: Map<string, number> = new Map<string, number>()

    constructor(private apiService: ApiService) {
    }

    SendSaveDataIntoServer() {
        this.apiService.PostSaveDataBudgetDetail().subscribe((i) => {
            console.log(i)
            this.apiService.ClearSaveData()
        })
    }

    ngOnInit(): void {
        console.log("ngOnInit")
        this.apiService
            .GetVisaSummary(this.year, this.brand)
            .subscribe((item) => {
                console.log(item)
                this.VisaCostSummary = item
            });
    }
}

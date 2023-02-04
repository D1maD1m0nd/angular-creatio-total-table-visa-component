import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IVisaCostSummary} from "../../data/model/response/VisaCostSummary";
import {ApiService} from "../../services/apiservice.service";

@Component({
    selector: 'vlt-summary-visa-cost-component',
    templateUrl: './vlt-summary-visa-cost.component.html',
    styleUrls: ['./vlt-summary-visa-cost.component.css']
})
export class VltSummaryVisaCostComponent {
    VisaCostSummary: IVisaCostSummary

    @Input("visa-cost-summary")
    public set value(value: string) {
        this.VisaCostSummary = JSON.parse(value);
    }

    @Output() VisaCostSummarySaveEmitter = new EventEmitter<Map<string, number>>();
    VisaCostSummarySave: Map<string, number> = new Map<string, number>()

    constructor(public apiService: ApiService) {
    }

    SendSaveDataIntoServer() {
        this.apiService.PostSaveDataBudgetDetail().subscribe((i) => {
            console.log(i)
            this.apiService.ClearSaveData()
        })
    }
}

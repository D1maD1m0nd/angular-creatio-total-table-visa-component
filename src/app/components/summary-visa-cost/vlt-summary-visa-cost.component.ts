import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IVisaCostSummary} from "../../data/model/response/VisaCostSummary";
import {ApiService} from "../../services/apiservice.service";
import {ConverterService} from "../../services/converter.service";

@Component({
    selector: 'vlt-summary-visa-cost',
    templateUrl: './vlt-summary-visa-cost.component.html',
    styleUrls: ['./vlt-summary-visa-cost.component.css']
})
export class VltSummaryVisaCostComponent {
    @Input("visa-cost-summary") VisaCostSummaryInput: string
    @Output() VisaCostSummarySaveEmitter = new EventEmitter<Map<string, number>>();
    VisaCostSummary: IVisaCostSummary
    VisaCostSummarySave: Map<string, number> = new Map<string, number>()

    constructor(public apiService: ApiService, public converterService: ConverterService) {
    }

    SendSaveDataIntoServer() {
        this.apiService.PostSaveDataBudgetDetail().subscribe((i) => {
            console.log(i)
            this.apiService.ClearSaveData()
        })
    }

    ngOnInit(): void {
        console.log("ngOnInit");
        this.converterService.VisaCostSummary$.subscribe((i) => {
            console.log(i)
            this.VisaCostSummary = i
        });
        this.converterService.convert(this.VisaCostSummaryInput);
    }
}

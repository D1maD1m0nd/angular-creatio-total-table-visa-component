import {Component, Input, OnInit, Renderer2} from "@angular/core";
import {ICostItem} from "../data/model/ItemCost";
import {Sort} from '@angular/material/sort';
import {ICostColumn} from "../data/model/CostColumn";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {FilteringColumnService} from "../../services/filteringcolumnservice.service";
import {ApiService} from "../../services/apiservice.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
        selector: 'app-visa-cost',
        templateUrl: './VisaCost.component.html',
        styleUrls: ['./VisaCost.component.css']
    }
)
export class VisaCostComponent implements OnInit {
    @Input() itemsColumnsArg: ICostColumn[]
    @Input() itemCostsArg: ICostItem[]
    itemsColumns: ICostColumn[]
    displayColumns: string[]
    groupByColumns: string[] = []
    itemCosts: ICostItem[]
    sortedDataItemCosts: ICostItem[]

    // @ts-ignore
    public dataSource = new MatTableDataSource<ICostItem>([]);

    constructor(public filterColumnService: FilteringColumnService,
                private renderer: Renderer2,
                private apiService: ApiService) {

    }

    changeTotalSumPlan(value: number, item: ICostItem) {
        item.TotalSumPlan = value
        this.apiService.UpdateDetailBudgetSum(item.DetailBudgetId, value).subscribe(i => {
            console.log(i);
        });
    }

    sortData(sort: Sort) {
        const data = this.itemCosts.slice();
        if (!sort.active || sort.direction === '') {
            this.sortedDataItemCosts = data;
            this.dataSource.data = this.sortedDataItemCosts
            return;
        }

        this.sortedDataItemCosts = data.sort((a: any, b: any) => {
            if (Object.keys(a).includes(sort.active)) {
                const isAsc = sort.direction === 'asc';
                return compare(a[sort.active], b[sort.active], isAsc);
            } else {
                return 0;
            }
        });
        this.dataSource.data = this.sortedDataItemCosts
    }

    tableDrop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.displayColumns, event.previousIndex, event.currentIndex);
    }

    ngOnInit(): void {
        this.itemCosts = this.itemCostsArg
        this.itemsColumns = this.itemsColumnsArg
        this.displayColumns = this.itemsColumns
            .filter((i) => i.Visible)
            .map((i) => i.ItemCostKey)
        this.sortedDataItemCosts = this.itemCostsArg.slice();
        this.dataSource.data = this.sortedDataItemCosts
        this.filterColumnService.isVisible$.subscribe((i) => {
            console.log(i)
            let item = this.itemsColumns.find((column) => column.ItemCostKey == i?.ItemCostKey)
            if (item) {
                console.log(item)
                item.Visible = i?.Visible
                this.displayColumns = this
                    .itemsColumns
                    .filter(column => column.Visible)
                    .map(column => column.ItemCostKey)
            }
        })
    }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

import {Component, Input, OnInit} from "@angular/core";
import {ICostItem} from "../data/model/ItemCost";
import {Sort} from '@angular/material/sort';
import {CostItemsColumns} from "../data/mock/ItemColumns";
import {CostItems} from "../data/mock/ItemCosts";
import {ICostColumn} from "../data/model/CostColumn";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {FilteringColumnService} from "../../services/filteringcolumnservice.service";

@Component({
    selector: 'app-visa-cost',
    templateUrl: './VisaCost.component.html',
    styleUrls: ['./VisaCost.component.css']
  }
)
export class VisaCostComponent implements OnInit{
  itemsColumns : ICostColumn[] = CostItemsColumns
  displayColumns : string[] = this.itemsColumns
      .filter((i) => i.Visible)
      .map((i) => i.ItemCostKey)
  itemCosts: ICostItem[] = CostItems
  sortedDataItemCosts : ICostItem[]

  constructor(public filterColumnService : FilteringColumnService) {
    this.sortedDataItemCosts = this.itemCosts.slice();
  }
  changeTotalSumPlan(value: number, item : ICostItem) {
    item.TotalSumPlan = value
  }
  sortData(sort: Sort) {
    const data = this.itemCosts.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedDataItemCosts = data;
      return;
    }

    this.sortedDataItemCosts = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case "TotalSumPlan":
        case "FourthQuarterPlanSum":
        case "ThirdQuarterPlanSum":
        case 'SecondQuarterPlanSum':
        case "FirstQuarterPlanSum":
        case 'BrandName':
        case "OwnerName":
        case 'CostItemName':
        case "GroupCostItemName":
        case 'FilialName':
          return compare(a[sort.active], b[sort.active], isAsc);
        default:
          return 0;
      }
    });
  }
  tableDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayColumns, event.previousIndex, event.currentIndex);
  }
  ngOnInit(): void {
    this.filterColumnService.isVisible$.subscribe((i) => {
        console.log(i)
      let item  = this.itemsColumns.find((column) => column.ItemCostKey == i?.ItemCostKey)
      if(item) {
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

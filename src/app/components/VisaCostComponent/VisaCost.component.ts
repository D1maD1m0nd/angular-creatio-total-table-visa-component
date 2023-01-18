import {Component, Input} from "@angular/core";
import {ICostItem} from "../data/model/ItemCost";
import {Sort} from '@angular/material/sort';
import {CostItemsColumns} from "../data/mock/ItemColumns";
import {CostItems} from "../data/mock/ItemCosts";
import {ICostColumn} from "../data/model/CostColumn";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-visa-cost',
    templateUrl: './VisaCost.component.html',
    styleUrls: ['./VisaCost.component.css']
  }
)
export class VisaCostComponent {
  itemsColumns : ICostColumn[] = CostItemsColumns
  displayColumns : string[] = this.itemsColumns.map((i) => i.ItemCostKey)
  itemCosts: ICostItem[] = CostItems
  sortedDataItemCosts : ICostItem[]

  constructor() {
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
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

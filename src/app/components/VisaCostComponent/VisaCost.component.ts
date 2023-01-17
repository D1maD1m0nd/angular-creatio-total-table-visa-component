import {Component, Input} from "@angular/core";
import {ICostItem} from "../data/model/ItemCost";
import {Sort} from '@angular/material/sort';

@Component({
    selector: 'app-visa-cost',
    templateUrl: './VisaCost.component.html',
    styleUrls: ['./VisaCost.component.css']
  }
)
export class VisaCostComponent {
  @Input() itemsColumns : string[]
  @Input() itemCosts: ICostItem[]
  sortedDataItemCosts : ICostItem[]

  constructor() {
    this.sortedDataItemCosts = this.itemCosts.slice();
  }

  sortData(sort: Sort) {
    const data = this.itemCosts.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedDataItemCosts = data;
      return;
    }

    this.sortedDataItemCosts = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      // switch (sort.active) {
      //   case 'name':
      //     return compare(a.name, b.name, isAsc);
      //   case 'calories':
      //     return compare(a.calories, b.calories, isAsc);
      //   case 'fat':
      //     return compare(a.fat, b.fat, isAsc);
      //   case 'carbs':
      //     return compare(a.carbs, b.carbs, isAsc);
      //   case 'protein':
      //     return compare(a.protein, b.protein, isAsc);
      //   default:
      //     return 0;
      // }
      return 0
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

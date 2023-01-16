import { Component } from '@angular/core';
import {CostItems} from "./components/data/mock/ItemCosts";
import {CostItemsColumns} from "./components/data/mock/ItemColumns";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  itemCosts = CostItems
  itemColumns = CostItemsColumns
}

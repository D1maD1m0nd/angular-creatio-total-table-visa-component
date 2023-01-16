import {Component, Input} from "@angular/core";
import {ICostItem} from "../data/model/ItemCost";
@Component({
    selector: 'app-visa-cost',
    templateUrl: './VisaCost.component.html',
    styleUrls: ['./VisaCost.component.css']
  }
)
export class VisaCostComponent {
  @Input() itemsColumns : string[]
  @Input() itemCosts: ICostItem[]

}

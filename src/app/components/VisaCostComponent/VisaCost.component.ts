import {Component, Input} from "@angular/core";
import {ICostItem} from "../data/model/ItemCost";
@Component({
    selector: 'app-product',
    templateUrl: './product.component.html'
  }
)
export class VisaCostComponent {
  @Input() itemCost : ICostItem[]

}

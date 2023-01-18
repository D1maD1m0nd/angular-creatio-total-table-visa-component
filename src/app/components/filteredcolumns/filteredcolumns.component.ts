import {Component, Input} from '@angular/core';
import {ICostColumn} from "../data/model/CostColumn";

@Component({
  selector: 'app-filteredcolumns',
  templateUrl: './filteredcolumns.component.html',
  styleUrls: ['./filteredcolumns.component.css']
})
export class FilteredColumnsComponent {
 @Input() column : ICostColumn
}

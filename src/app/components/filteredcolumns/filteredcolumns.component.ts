import {Component, Input} from '@angular/core';
import {ICostColumn} from "../data/model/CostColumn";
import {FilteringColumnService} from "../../services/filteringcolumnservice.service";

@Component({
  selector: 'app-filteredcolumns',
  templateUrl: './filteredcolumns.component.html',
  styleUrls: ['./filteredcolumns.component.css']
})
export class FilteredColumnsComponent {
  constructor(public filterColumnService : FilteringColumnService) {
  }
 @Input() column : ICostColumn
}

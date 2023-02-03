import {Component, Input, OnInit} from '@angular/core';
import {ICostColumn} from "../data/model/response/CostColumn";
import {FilteringColumnService} from "../../services/filteringcolumnservice.service";

@Component({
    selector: 'vlt-filter-column',
    templateUrl: './filter-column.component.html',
    styleUrls: ['./filter-column.component.css']
})
export class FilterColumnComponent implements OnInit {

    @Input() column: ICostColumn

    constructor(public filterColumnService: FilteringColumnService) {
    }

    ngOnInit(): void {
    }

}

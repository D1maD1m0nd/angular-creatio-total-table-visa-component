import {Component, Input} from '@angular/core';
import {IMetaData} from "../data/model/response/MetaData";

@Component({
    selector: 'app-title-visa-table',
    templateUrl: './title-visa-table.component.html',
    styleUrls: ['./title-visa-table.component.css']
})
export class TitleVisaTableComponent {
    @Input() metaData: IMetaData
}

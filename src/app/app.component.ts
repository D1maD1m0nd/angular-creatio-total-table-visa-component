import {Component, OnInit} from '@angular/core';
import {ApiService} from "./services/apiservice.service";
import {dataStringify} from "./data/mock/TestData";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(public apiService: ApiService) {
    }

    data: string = dataStringify

    ngOnInit(): void {
    }
}

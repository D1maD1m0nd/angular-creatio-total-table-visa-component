import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {IVisaCostSummary} from "../data/model/response/VisaCostSummary";

@Injectable({
    providedIn: 'root'
})
export class ConverterService {
    VisaCostSummary$ = new Subject<IVisaCostSummary>()

    convert(json: string) {
        const obj = JSON.parse(json);
        console.log(obj)
        this.VisaCostSummary$.next(obj)
    }

    constructor() {
    }
}

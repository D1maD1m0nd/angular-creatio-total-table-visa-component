import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ICostColumn} from "../components/data/model/CostColumn";

@Injectable({
  providedIn: 'root'
})
export class FilteringColumnService {
  isVisible$ = new BehaviorSubject<ICostColumn|null>(null)
  constructor() { }
  changeVisibleColumn(item: ICostColumn) {
      item.Visible = !item.Visible
    this.isVisible$.next(item)
  }
}

import {Injectable} from '@angular/core';
import {ErrorService} from "./error.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IVisaCostSummary} from "../components/data/model/VisaCostSummary";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    BASE_URL = 'https://fotodom.site:489/0'
    constructor(
        private http: HttpClient,
        private errorService : ErrorService) {
    }

    GetVisaSummary(YearId: string | null, BrandId: string | null): Observable<IVisaCostSummary> {
        return this.http.post<IVisaCostSummary>(`${this.BASE_URL}/ServiceModel/VisaCostItemWebService.svc/GetVisaItems`, {
            "yearBudgetId": YearId,
            "brandBudgetId": BrandId
        });

        // "yearBudgetId": "42533c5f-b173-4386-a1d9-8e02e5b91d4d",
        //     "brandBudgetId": "f4c9e1ef-167e-4aef-b2c1-56950486df79"
    }

}

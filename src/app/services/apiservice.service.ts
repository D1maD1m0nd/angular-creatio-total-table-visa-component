import {Injectable} from '@angular/core';
import {ErrorService} from "./error.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {IVisaCostSummary} from "../components/data/model/response/VisaCostSummary";
import {ICostVisaSaveData} from "../components/data/model/request/ICostVisaSaveData";
import {ICostVisaSaveItem} from "../components/data/model/request/ICostVisaSaveItem";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    VisaCostSummary: IVisaCostSummary
    VisaCostSummarySave: Map<string, number> = new Map();
    BASE_URL = 'https://fotodom.site:489/0'

    constructor(
        private http: HttpClient,
        private errorService: ErrorService) {
    }

    AddSaveData(id: string, sum: number) {
        console.log(`AddSave Data ${id}, ${sum}`);
        this.VisaCostSummarySave.set(id, sum);
    }

    ClearSaveData() {
        this.VisaCostSummarySave.clear();
    }

    PostSaveDataBudgetDetail(): Observable<any> {
        const saveDataArray: ICostVisaSaveItem[] = [];
        this.VisaCostSummarySave.forEach((value, key) => {
            saveDataArray.push({
                    Id: key,
                    TotalSumPlan: value
                }
            );
        });
        const CostVisaSaveData: ICostVisaSaveData = {
            CostItemData: saveDataArray
        }
        return this.http.post(
            `${this.BASE_URL}/ServiceModel/VisaCostItemWebService.svc/UpdateRecordsDetailBudgetSum`,
            CostVisaSaveData
        );
    }
    GetVisaSummary(YearId: string | null, BrandId: string | null): Observable<IVisaCostSummary> {
        return this.http.post<IVisaCostSummary>(`${this.BASE_URL}/ServiceModel/VisaCostItemWebService.svc/GetVisaItems`, {
            "yearBudgetId": YearId,
            "brandBudgetId": BrandId
        }).pipe(
            tap(VisaCost => this.VisaCostSummary = VisaCost),
            catchError(this.errorHandler.bind(this))
        );
        // "yearBudgetId": "42533c5f-b173-4386-a1d9-8e02e5b91d4d",
        //     "brandBudgetId": "f4c9e1ef-167e-4aef-b2c1-56950486df79"
    }

    private errorHandler(error: HttpErrorResponse) {
        this.errorService.handler(error.message)
        return throwError(() => error.message)
    }

}

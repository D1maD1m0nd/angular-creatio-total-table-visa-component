import {Injectable} from '@angular/core';
import {ErrorService} from "./error.service";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {IVisaCostSummary} from "../data/model/response/VisaCostSummary";
import {ICostVisaSaveData} from "../data/model/request/ICostVisaSaveData";
import {ICostVisaSaveItem} from "../data/model/request/ICostVisaSaveItem";
import {CookieService} from "ngx-cookie-service";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    VisaCostSummary: IVisaCostSummary
    VisaCostSummarySave: Map<string, number> = new Map();
    BASE_URL = 'https://fotodom.site:489/0'
    BPM_CSRF_TOKEN: string = "80"

    constructor(
        private http: HttpClient,
        private errorService: ErrorService,
        private cookieService: CookieService) {
        const url = window.location['origin'];
        const token = this.cookieService.get('BPMCSRF');
        this.BPM_CSRF_TOKEN = this.cookieService.get('BPMCSRF');
        if (token) {
            this.BPM_CSRF_TOKEN = token;
        }
        if (url) {
            this.BASE_URL = `${url}/0`
        }
        console.log(token);
    }

    AddSaveData(id: string, sum: number) {
        console.log(`AddSave Data ${id}, ${sum}`);
        this.VisaCostSummarySave.set(id, sum);
    }

    ClearSaveData() {
        this.VisaCostSummarySave.clear();
    }

    PrepareDataBeforeSave(): ICostVisaSaveData {
        const saveDataArray: ICostVisaSaveItem[] = [];
        this.VisaCostSummarySave.forEach((value, key) => {
            saveDataArray.push({
                    Id: key,
                    TotalSumPlan: value
                }
            );
        });
        return {
            CostItemData: saveDataArray
        };
    }

    GetHeaders(): HttpHeaders {
        return new HttpHeaders().set(
            'BPMCSRF', this.BPM_CSRF_TOKEN
        );
    }

    PostSaveDataBudgetDetail(): Observable<any> {
        const data = this.PrepareDataBeforeSave()
        const headers = this.GetHeaders()
        return this.http.post(
            `${this.BASE_URL}/rest/VisaCostItemWebService/UpdateRecordsDetailBudgetSum`,
            data,
            {
                headers: headers
            }
        );
    }

    GetVisaSummary(YearId: string | null, BrandId: string | null): Observable<IVisaCostSummary> {
        const headers = this.GetHeaders();
        return this.http.post<IVisaCostSummary>(`${this.BASE_URL}/rest/VisaCostItemWebService/GetVisaItems`, {
                "yearBudgetId": YearId,
                "brandBudgetId": BrandId,
            },
            {
                headers: headers
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

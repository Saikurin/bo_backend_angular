import {Injectable} from '@angular/core';
import {Histories} from "../interfaces/histories";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class HistoriesService {

    constructor(private http: HttpClient) {
    }

    addHistories(histories: Histories[]) {
        return this.http.post(environment.api_url + "/histories/", histories);
    }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Categories} from "../interfaces/categories";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategoriesWithProducts() {
    return this.http.get<Categories[]>(environment.api_url + "/categories/");
  }
}

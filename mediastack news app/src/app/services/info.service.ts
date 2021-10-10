import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, take } from 'rxjs/operators';

import { ApiResponse, ApiData } from '../models/info.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InfoService {
  private apiResponseData: Observable<ApiData[]>;

  constructor(public http: HttpClient) {}

  categories = 'technology, sports';
  sortOption = 'published_desc';

  public getInfo(offset: string, limit: string): Observable<any> {
    const apiKey = '36abbbdd78d186ea37e11a1fdf8163bd';
    const baseUrl = `http://api.mediastack.com/v1/news?access_key=${apiKey}`;
    const languageOption = 'en';
    const apiUrl = `${baseUrl}&languages=${languageOption}&categories=${this.categories}&sort=${this.sortOption}&offset=${offset}&limit=${limit}`;

    this.apiResponseData = this.http.get<ApiResponse>(apiUrl).pipe(
      take(1),
      map((res) => {
        return res.data;
      }),
      catchError((err) => {
        throw 'an error occured: ' + err;
      })
    );

    return this.apiResponseData;
  }

  public switchCategories(categorie: string) {
    this.categories = categorie;
  }

  public sortDisplay(sort: string) {
    this.sortOption = sort;
  }
}

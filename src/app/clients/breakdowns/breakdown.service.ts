import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BreakdownService {
  private readonly API = `${environment.api}breakdowns`;

  constructor(private http: HttpClient) { }

  all(page: number, perPage: number): Observable<any> {
    return this.http.get<any>(`${this.API}?type=client&page=${page}&perPage=${perPage}`);
  }

  search(page: number, perPage: number, search: string): Observable<any> {
    return this.http.get<any>(`${this.API}?type=client&page=${page}&perPage=${perPage}&search=${search}`);
  }
}

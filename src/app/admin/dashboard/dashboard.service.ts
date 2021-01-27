import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {environment} from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  dashboardData(id: number = null): Observable<any> {
    if (id) {
      return this.http.get(`${environment.api}dashboard?user=${id}`);
    }
    return this.http.get(`${environment.api}dashboard`);
  }
}

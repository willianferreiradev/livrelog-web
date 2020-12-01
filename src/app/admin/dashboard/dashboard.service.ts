import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  dashboardData() {
    return this.http.get(`${environment.api}dashboard`);
  }
}

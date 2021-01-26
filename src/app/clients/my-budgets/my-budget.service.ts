import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Pagination } from '@models/Pagination';
import { Budget } from '@models/Budget';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@shared/services/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class MyBudgetService {
  private readonly API = `${environment.api}budgets`;

  constructor(
    private http: HttpClient,
    private authentication: AuthenticationService
  ) { }

  all(page: number, perPage: number): Observable<Pagination<Budget>> {
    const client = this.authentication.currentUserValue.id;
    const params = `?type=client&page=${page}&perPage=${perPage}&client=${client}`;
    return this.http.get<Pagination<Budget>>(`${this.API}${params}`);
  }

  search(page: number, perPage: number, search: string): Observable<Pagination<Budget>> {
    const client = this.authentication.currentUserValue.id;
    const params = `?type=client&page=${page}&perPage=${perPage}&search=${search}&client=${client}`;
    return this.http.get<Pagination<Budget>>(`${this.API}${params}`);
  }
}

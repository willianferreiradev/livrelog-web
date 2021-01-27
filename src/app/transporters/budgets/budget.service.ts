import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Pagination } from '@models/Pagination';
import { Budget } from '@models/Budget';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private readonly API = `${environment.api}budgets`;

  constructor(private http: HttpClient) { }

  all(page: number, perPage: number): Observable<Pagination<Budget>> {
    return this.http.get<Pagination<Budget>>(`${this.API}?type=transporter&page=${page}&perPage=${perPage}`);
  }

  search(page: number, perPage: number, search: string): Observable<Pagination<Budget>> {
    return this.http.get<Pagination<Budget>>(`${this.API}?type=transporter&page=${page}&perPage=${perPage}&search=${search}`);
  }

  createProposal(proposal): Observable<any> {
    return this.http.post(`${environment.api}proposals`, proposal);
  }

  updateProposal(proposal) {
    return this.http.put(`${environment.api}proposals/${proposal.id}`, proposal);
  }
}

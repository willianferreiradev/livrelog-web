import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Pagination } from '@models/Pagination';
import { Transporter } from '@models/Transporter';

@Injectable({
  providedIn: 'root'
})
export class TransportersService {
  private readonly API = `${environment.api}transporters`;

  constructor(private http: HttpClient) { }

  all(page: number, perPage: number): Observable<Pagination<Transporter>> {
    return this.http.get<Pagination<Transporter>>(`${this.API}?type=client&page=${page}&perPage=${perPage}`);
  }

  search(page: number, perPage: number, search: string): Observable<Pagination<Transporter>> {
    return this.http.get<Pagination<Transporter>>(`${this.API}?type=client&page=${page}&perPage=${perPage}&search=${search}`);
  }
}

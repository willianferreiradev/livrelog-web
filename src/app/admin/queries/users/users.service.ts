import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

import { Pagination } from '@models/Pagination';
import { User } from '@models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly API = `${environment.api}users`;

  constructor(private http: HttpClient) { }

  all(page: number, perPage: number): Observable<Pagination<User>> {
    return this.http.get<Pagination<User>>(`${this.API}?type=client&page=${page}&perPage=${perPage}`);
  }

  search(page: number, perPage: number, search: string): Observable<Pagination<User>> {
    return this.http.get<Pagination<User>>(`${this.API}?type=client&page=${page}&perPage=${perPage}&search=${search}`);
  }
}

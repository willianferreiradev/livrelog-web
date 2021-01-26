import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyChangeService {
  private readonly API = `${environment.api}changes`;

  constructor(
    private http: HttpClient,
    private authentication: AuthenticationService
  ) { }

  all(page: number, perPage: number): Observable<any> {
    const client = this.authentication.currentUserValue.id;
    return this.http.get<any>(`${this.API}?type=client&page=${page}&perPage=${perPage}&client=${client}`);
  }

  search(page: number, perPage: number, search: string): Observable<any> {
    const client = this.authentication.currentUserValue.id;
    return this.http.get<any>(`${this.API}?type=client&page=${page}&perPage=${perPage}&search=${search}&client=${client}`);
  }
}

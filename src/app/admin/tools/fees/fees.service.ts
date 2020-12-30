import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeesService {
  private readonly API = `${environment.api}fees`;

  constructor(private http: HttpClient) { }

  index(): Observable<any> {
    return this.http.get(this.API);
  }

  update(fee): Observable<any> {
    return this.http.post(this.API, { fee });
  }
}

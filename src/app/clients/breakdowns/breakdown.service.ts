import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '@shared/services/authentication.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BreakdownService {
  private readonly API = `${environment.api}breakdowns`;

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService
  ) { }

  all(page: number, perPage: number): Observable<any> {
    return this.http.get<any>(`${this.API}?type=client&page=${page}&perPage=${perPage}`);
  }

  search(page: number, perPage: number, search: string): Observable<any> {
    return this.http.get<any>(`${this.API}?type=client&page=${page}&perPage=${perPage}&search=${search}`);
  }

  getChanges(): Observable<any> {
    return this.http.get(`${environment.api}changes?simpleRequest=true&user=${this.auth.currentUserValue.id}`);
  }

  create(breakdown, image): Observable<any> {
    const formData: FormData = new FormData();
    Object.keys(breakdown).forEach(key => {
      if (breakdown[key] === 'null') formData.append(key, '');
      else formData.append(key, breakdown[key]);
    });
    formData.append('image', image, image.name);
    return this.http.post(this.API, formData);
  }
}

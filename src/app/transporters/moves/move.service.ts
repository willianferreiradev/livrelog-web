import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoveService {
  private readonly API = `${environment.api}changes`;

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  all(page: number, perPage: number): Observable<any> {
    const transporter = this.auth.currentUserValue.transporter.id
    return this.http.get<any>(`${this.API}?type=transporter&page=${page}&perPage=${perPage}&transporter_id=${transporter}`);
  }

  search(page: number, perPage: number, search: string): Observable<any> {
    const transporter = this.auth.currentUserValue.transporter.id
    return this.http.get<any>(`${this.API}?type=transporter&page=${page}&perPage=${perPage}&search=${search}&transporter_id=${transporter}`);
  }
}

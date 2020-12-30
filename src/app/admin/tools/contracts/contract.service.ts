import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private readonly API = `${environment.api}contract`;

  constructor(
    private http: HttpClient
  ) { }

  find(): Observable<any> {
    return this.http.get(this.API);
  }

  register(contract: string): Observable<any> {
    return this.http.post(this.API, {
      contract
    });
  }
}

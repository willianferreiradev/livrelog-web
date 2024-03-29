import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private http: HttpClient,
  ) {
    this.currentUserSubject = new BehaviorSubject<unknown>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(loginData: any): Observable<User> {
    return this.http.post<any>(`${environment.api}auth/login`, loginData)
      .pipe(
        map(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }));
  }

  signin(formValue: any): Observable<any> {
    return this.http.post(`${environment.api}auth/signup`, formValue);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('clinic');
    this.currentUserSubject.next(null);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly API = `${environment.api}users/`;

  constructor(private http: HttpClient) { }

  findById(id: number): Observable<any>{
    return this.http.get(`${this.API}${id}`);
  }

  update(user: any, image: any = null): Observable<any> {
    const formData: FormData = new FormData();
    Object.keys(user).forEach(key => {
      if (key !== 'type') formData.append(key, user[key]);
    });
    if (image) {
      formData.append('image', image, image.name);
    }
    return this.http.post(`${this.API}${user.id}?_method=PUT`, formData);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '@shared/services/authentication.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private readonly API = `${environment.api}drivers/`;

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  all(page: number, perPage: number): Observable<any> {
    const transporter = this.auth.currentUserValue.transporter.id;
    return this.http.get<any>(`${this.API}?page=${page}&perPage=${perPage}&transporter_id=${transporter}`);
  }

  search(page: number, perPage: number, search: string): Observable<any> {
    const transporter = this.auth.currentUserValue.transporter.id;
    return this.http.get<any>(
      `${this.API}?page=${page}&perPage=${perPage}&search=${search}&transporter_id=${transporter}`);
  }

  create(driver, images): Observable<any> {
    const formData: FormData = new FormData();
    Object.keys(driver).forEach(key => {
      if (driver[key] === 'null') formData.append(key, '');
      else formData.append(key, driver[key]);
    });
    formData.append('photo', images[0], images[0].name);
    formData.append('front_cpf', images[1], images[1].name);
    formData.append('back_cpf', images[2], images[2].name);
    formData.append('front_cnh', images[3], images[3].name);
    formData.append('back_cnh', images[4], images[4].name);
    return this.http.post(this.API, formData);
  }

  update(driver, images): Observable<any> {
    const formData: FormData = new FormData();
    Object.keys(driver).forEach(key => {
      if (driver[key] === 'null') formData.append(key, '');
      else formData.append(key, driver[key]);
    });
    if (images[0]) formData.append('photo', images[0], images[0].name);
    if (images[1]) formData.append('front_cpf', images[1], images[1].name);
    if (images[2]) formData.append('back_cpf', images[2], images[2].name);
    if (images[3]) formData.append('front_cnh', images[3], images[3].name);
    if (images[4]) formData.append('back_cnh', images[4], images[4].name);
    return this.http.post(`${this.API}${driver.id}?_method=PUT`, formData);
  }
}

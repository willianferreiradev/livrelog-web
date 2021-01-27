import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '@shared/services/authentication.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly API = `${environment.api}vehicles/`;

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

  create(vehicle, images): Observable<any> {
    const formData: FormData = new FormData();
    Object.keys(vehicle).forEach(key => {
      if (vehicle[key] === 'null') formData.append(key, '');
      else formData.append(key, vehicle[key]);
    });
    formData.append('photo', images[0], images[0].name);
    formData.append('front_renavam_photo', images[1], images[1].name);
    formData.append('back_renavam_photo', images[2], images[2].name);
    return this.http.post(this.API, formData);
  }

  update(vehicle, images): Observable<any> {
    const formData: FormData = new FormData();
    Object.keys(vehicle).forEach(key => {
      if (vehicle[key] === 'null') formData.append(key, '');
      else formData.append(key, vehicle[key]);
    });
    if (images[0]) formData.append('photo', images[0], images[0].name);
    if (images[1]) formData.append('front_renavam_photo', images[1], images[1].name);
    if (images[2]) formData.append('back_renavam_photo', images[2], images[2].name);
    return this.http.post(`${this.API}${vehicle.id}?_method=PUT`, formData);
  }
}

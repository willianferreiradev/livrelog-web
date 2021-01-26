import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '@shared/services/authentication.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private readonly API = `${environment.api}budgets`;

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  create(budget, images): Observable<any> {

    const formData: FormData = new FormData();
    formData.append(`client_id`, this.authService.currentUserValue.id);
    const objects = ['delivery', 'destination', 'origin', 'withdrawal'];
    Object.keys(budget).forEach(key => {
      if (objects.includes(key)) {
        formData.append(key, JSON.stringify(budget[key]));
      } else {
        formData.append(key, budget[key]);
      }
    });
    images.forEach((element) => {
      formData.append(`image[]`, element, element.name);
    });
    return this.http.post(this.API, formData);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitlePageService {
  titleSubject: BehaviorSubject<any> = new BehaviorSubject({
    title: 'Titulo',
    breadcrumb: ['Home']
  });
}

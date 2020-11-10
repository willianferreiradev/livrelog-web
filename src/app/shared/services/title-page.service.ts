import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitlePageService {
  titleSubject: BehaviorSubject<string> = new BehaviorSubject(null);
}

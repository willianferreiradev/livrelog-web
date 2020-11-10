import { Component, OnInit } from '@angular/core';
import { TitlePageService } from './shared/services/title-page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string;

  constructor(private titleService: TitlePageService) {

  }

  ngOnInit(): void {
    this.titleService.titleSubject.subscribe(title => this.title = title);
  }
}

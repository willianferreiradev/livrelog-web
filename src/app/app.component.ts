import { Component, OnInit } from '@angular/core';

import { TitlePageService } from '@services/title-page.service';
import { LoaderService } from '@services/loader.service';

import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string;

  constructor(
    private titleService: TitlePageService,
    private spinner: NgxSpinnerService,
    private loader: LoaderService,
    ) {

  }

  ngOnInit(): void {
    this.titleService.titleSubject.subscribe(title => this.title = title);
    this.loader.loaderState.subscribe(state => {
      state === true ? this.spinner.show() : this.spinner.hide();
    });
  }

  isAuthRoute(): boolean {
    return location.href.includes('auth/login');
  }
}

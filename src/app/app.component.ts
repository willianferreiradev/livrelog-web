import { Component, OnInit } from '@angular/core';

import { TitlePageService } from '@services/title-page.service';
import { LoaderService } from '@services/loader.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime } from 'rxjs/operators';
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
    this.titleService.titleSubject.pipe(debounceTime(1)).subscribe(title => this.title = title);
    this.loader.loaderState.subscribe(state => {
      state === true ? this.spinner.show() : this.spinner.hide();
    });
  }

  isAuthRoute(): boolean {
    const authRoutes = [
      'auth/login',
      'auth/logout',
      'auth/create-account'
    ];

    return authRoutes.some(i => location.href.includes(i));
  }
}

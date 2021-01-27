import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit, OnDestroy {
  queryParams = { type: 'client' };

  constructor(@Inject(DOCUMENT) private document: Document, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.document.body.style.background = '#12214a';
    this.route.queryParams.subscribe(({ type }) => this.queryParams.type = type);
  }

  ngOnDestroy(): void {
    this.document.body.style.background = '#fff';
  }

}

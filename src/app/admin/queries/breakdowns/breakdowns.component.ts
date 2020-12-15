import { Component, OnInit } from '@angular/core';
import { TitlePageService } from '@shared/services/title-page.service';

@Component({
  selector: 'app-breakdowns',
  templateUrl: './breakdowns.component.html',
  styleUrls: ['./breakdowns.component.scss']
})
export class BreakdownsComponent implements OnInit {

  constructor(private title: TitlePageService) { }

  ngOnInit(): void {
    this.title.titleSubject.next({ title: 'Relação de Avarias', breadcrumb: ['Home', 'Consultas', 'Avarias'] });
  }

}

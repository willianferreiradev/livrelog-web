import { Component, OnInit } from '@angular/core';
import { TitlePageService } from '@shared/services/title-page.service';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss']
})
export class BudgetsComponent implements OnInit {

  constructor(private title: TitlePageService) { }

  ngOnInit(): void {
    this.title.titleSubject.next({ title: 'Relação de Orçamentos', breadcrumb: ['Home', 'Consultas', 'Orçamentos'] });
  }

}

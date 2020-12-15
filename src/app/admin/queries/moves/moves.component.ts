import { Component, OnInit } from '@angular/core';
import { TitlePageService } from '@shared/services/title-page.service';

@Component({
  selector: 'app-moves',
  templateUrl: './moves.component.html',
  styleUrls: ['./moves.component.scss']
})
export class MovesComponent implements OnInit {

  constructor(private title: TitlePageService) { }

  ngOnInit(): void {
    this.title.titleSubject.next({ title: 'Relação de Mudanças', breadcrumb: ['Home', 'Consultas', 'Mudanças'] });
  }

}

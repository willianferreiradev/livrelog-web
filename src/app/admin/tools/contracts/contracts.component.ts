import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { TitlePageService } from '@shared/services/title-page.service';
import { ContractService } from './contract.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {
  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Digite o contrato aqui',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };

  constructor(
    private contract: ContractService,
    private titleService: TitlePageService
    ) { }

  ngOnInit(): void {
    this.titleService.titleSubject.next({
      title: `Cadastro / Edição de Contrato`,
      breadcrumb: ['Home', 'Ferramentas', 'Contrato']
    });

    this.contract.find().subscribe(e => this.htmlContent = e.contract);
  }


  register(): void {
    this.contract.register(this.htmlContent).subscribe(e => console.log(e));
  }

}

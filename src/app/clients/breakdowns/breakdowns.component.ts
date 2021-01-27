import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatatableService } from '@shared/components/datatable/datatable.service';
import { DatatableData } from '@shared/models/Datatable';
import { TitlePageService } from '@shared/services/title-page.service';
import { switchMap } from 'rxjs/operators';
import { BreakdownService } from './breakdown.service';
import columns from './breakdown.columns';
import { BaseForm } from '@shared/helpers/BaseForm';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-breakdowns',
  templateUrl: './breakdowns.component.html',
  styleUrls: ['./breakdowns.component.scss']
})
export class BreakdownsComponent extends BaseForm implements OnInit {
  datatableData: DatatableData<any>;
  perPage: number;
  filter = '';
  image: any;
  imageToServer: any;
  @ViewChild('content') newContent: ElementRef;
  changes = [];
  errorImage: string;

  constructor(
    private title: TitlePageService,
    private breakdownService: BreakdownService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private service: BreakdownService,
    private modalService: NgbModal
  ) {
    super();
  }

  ngOnInit(): void {
    this.title.titleSubject.next({ title: 'Reportar avarias', breadcrumb: ['Home', 'Reportar avarias'] });
    this.createForm();
    this.service.getChanges().subscribe(e => this.changes = e);
  }

  submit(): void {
    if (!this.imageToServer) {
      this.errorImage = 'É necessário adicionar uma imagem ao cadastrar uma avaria';
      return;
    }
    this.service.create(this.formValue, this.imageToServer).subscribe(() => {
      this.openModal();
    });
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      change_id: [null, Validators.required],
      name: [null, Validators.required],
      description: [null],
    });
  }

  upload(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.image = e.target.result;
        this.imageToServer = event.target.files[0];
        this.errorImage = null;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onError(event: any): void {
    event.target.src = 'assets/images/no-image.png';
  }

  openModal(): void {
    this.modalService.open(this.newContent).result.then(() => {
      this.reset();
      this.imageToServer = null;
      this.image = 'assets/images/no-image.png';
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@shared/services/authentication.service';
import { TitlePageService } from '@shared/services/title-page.service';
import { DashboardService } from 'src/app/admin/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  informationBoxes = [];
  proposals = [];

  constructor(
    private title: TitlePageService,
    private auth: AuthenticationService,
    private dashboard: DashboardService
  ) { }

  ngOnInit(): void {
    this.title.titleSubject.next({ title: `Bem vindo ${this.auth.currentUserValue.name}`, breadcrumb: ['Home', 'Dashboard']});
    this.dashboard.dashboardData(this.auth.currentUserValue.id).subscribe(data => {
      this.informationBoxes = this.getInformationBoxes(data);
      this.proposals = data.proposalsList;
    });
  }

  getLabelStatus(proposal: any): string {
    if (proposal.changes) {
      return 'badge-success';
    }

    return 'badge-purple';
  }

  getStatus(proposal: any): string {
    if (proposal.changes) {
      return 'Contratado';
    }

    return 'Em negociação';
  }

  getInformationBoxes(data): any {
    return [
      {
        title: 'Orçamentos Hoje',
        number: data.budgetsCreatedToday,
        subtitle: 'Solicitados por você',
        colorClass: 'bg-purple',
        icon: {
          name: 'mdi-file-document'
        }
      },
      {
        title: 'Respostas a orçamentos',
        number: data.proposals,
        subtitle: 'Enviados por transportadoras',
        colorClass: 'bg-info',
        icon: {
          name: 'mdi-truck'
        }
      },
      {
        title: 'Você tem',
        number: data.contractedChanges,
        subtitle: 'Mudanças contradas',
        colorClass: 'bg-pink',
        icon: {
          name: ' mdi-truck-delivery'
        }
      },
    ];
  }
}

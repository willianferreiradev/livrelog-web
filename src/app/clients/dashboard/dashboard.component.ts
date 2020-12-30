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

  constructor(
    private title: TitlePageService,
    private auth: AuthenticationService,
    private dashboard: DashboardService
  ) { }

  ngOnInit(): void {
    this.title.titleSubject.next({ title: `Bem vindo ${this.auth.currentUserValue.name}`, breadcrumb: ['Home', 'Dashboard']});
    this.dashboard.dashboardData().subscribe(data => this.informationBoxes = this.getInformationBoxes(data));
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
        number: data.changesToday,
        subtitle: 'Enviados por transportadoras',
        colorClass: 'bg-info',
        icon: {
          name: 'mdi-truck'
        }
      },
      {
        title: 'Você tem',
        number: data.usersCreatedToday,
        subtitle: 'Mudança contrada',
        colorClass: 'bg-pink',
        icon: {
          name: ' mdi-truck-delivery'
        }
      },
    ];
  }
}

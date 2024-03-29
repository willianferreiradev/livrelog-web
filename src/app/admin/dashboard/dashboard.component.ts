import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@shared/services/authentication.service';
import {
  IBarChartOptions,
  IChartistAnimationOptions,
  IChartistData
} from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';

import { TitlePageService } from '../../shared/services/title-page.service';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user = { name: 'Thiago Ventura' };
  type: ChartType = 'Bar';
  data: IChartistData = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    series: [
      [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
      [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
    ],

  };

  options: IBarChartOptions = {
    axisX: {
      showGrid: false
    },
    height: 300,
  };

  events: ChartEvent = {
    draw: (data) => {
      if (data.type === 'bar') {
        data.element.animate({
          y2:  {
            dur: '0.5s',
            from: data.y1,
            to: data.y2,
            easing: 'easeOutQuad'
          } as IChartistAnimationOptions
        });
      }
    }
  };

  dashboardData: any;
  informationBoxes: any = [];

  constructor(
    private titleService: TitlePageService,
    private authService: AuthenticationService,
    private dashboard: DashboardService
  ) { }

  ngOnInit(): void {
    this.titleService.titleSubject.next({
      title: `Bem vindo ${this.authService.currentUserValue.name}`,
      breadcrumb: ['Home', 'Dashboard']
    });

    this.dashboard.dashboardData().subscribe(data => this.setInformationBoxes(data));
  }

  setInformationBoxes(data): any {
    this.informationBoxes = this.getInformationBoxes(data);
  }

  getInformationBoxes(data): any {
    return [
      {
        title: 'Orçamentos Hoje',
        number: data.budgetsCreatedToday,
        subtitle: 'Solicitados por Usuários',
        colorClass: 'bg-purple',
        icon: {
          name: 'mdi-file-document'
        }
      },
      {
        title: 'Mudanças Hoje',
        number: data.changesToday,
        subtitle: 'Agendadas',
        colorClass: 'bg-info',
        icon: {
          name: 'mdi-truck'
        }
      },
      {
        title: 'Novos Usuários',
        number: data.usersCreatedToday,
        subtitle: 'Cadastros de Hoje',
        colorClass: 'bg-pink',
        icon: {
          name: ' mdi-account'
        }
      },
      {
        title: 'Orçamentos Gerados',
        number: data.budgetsGenerateds,
        subtitle: 'Hoje por Transportadoras',
        colorClass: 'bg-success',
        icon: {
          name: 'mdi-file-compare'
        }
      },
    ];
  }

}

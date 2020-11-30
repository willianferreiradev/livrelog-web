import { Component, OnInit } from '@angular/core';
import {
  IBarChartOptions,
  IChartistAnimationOptions,
  IChartistData
} from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';

import { TitlePageService } from '../../shared/services/title-page.service';

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

  constructor(
    private titleService: TitlePageService
  ) { }

  ngOnInit(): void {
    this.titleService.titleSubject.next(`Bem vindo ${this.user.name}`);
  }

  getInformationBoxes(): any {
    return [
      {
        title: 'Orçamentos Hoje',
        number: 0,
        subtitle: 'Solicitados por Usuários',
        colorClass: 'bg-purple',
        icon: {
          name: 'mdi-file-document'
        }
      },
      {
        title: 'Mudanças Hoje',
        number: 0,
        subtitle: 'Agendadas',
        colorClass: 'bg-info',
        icon: {
          name: 'mdi-truck'
        }
      },
      {
        title: 'Novos Usuários',
        number: 0,
        subtitle: 'Cadastros de Hoje',
        colorClass: 'bg-pink',
        icon: {
          name: ' mdi-account'
        }
      },
      {
        title: 'Orçamentos Gerados',
        number: 0,
        subtitle: 'Hoje por Transportadoras',
        colorClass: 'bg-success',
        icon: {
          name: 'mdi-file-compare'
        }
      },
    ];
  }

}

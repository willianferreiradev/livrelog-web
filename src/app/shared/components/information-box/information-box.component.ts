import { Component, Input, OnInit } from '@angular/core';

interface Icon {
  name: string;
}

interface InformationData {
  title: string;
  subtitle: string;
  number: number;
  colorClass: string;
  icon: Icon;
}

@Component({
  selector: 'app-information-box',
  templateUrl: './information-box.component.html',
  styleUrls: ['./information-box.component.scss']
})
export class InformationBoxComponent implements OnInit {
  @Input() data: InformationData;

  constructor() { }

  ngOnInit(): void {
  }

}

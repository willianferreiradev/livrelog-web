import { Component, OnInit } from '@angular/core';

import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  data;

  constructor(
    private navbarService: NavbarService
  ) { }

  ngOnInit(): void {
    this.data = this.navbarService.getMockData();
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TypeUser } from '@shared/enums/TypeUser';
import { User } from '@shared/models/User';
import { AuthenticationService } from '@shared/services/authentication.service';

import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  data;
  TypeUser = TypeUser;
  user: User;
  expandedMenu = false;

  constructor(
    private navbarService: NavbarService,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.data = this.navbarService.getMockData();
    this.authService.currentUser.subscribe(e => this.user = e);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['auth', 'logout']);
  }

  openMenu() {
    this.expandedMenu = !this.expandedMenu;
    const navigation = document.querySelector('#navigation');
    const lines = document.querySelector('#lines');
    const submenusNodeList = document.querySelectorAll('#navigation .submenu.megamenu');
    const submenus = Array.from(submenusNodeList);
    let styles = '';
    if (this.expandedMenu) {
      styles = `display: block; animation: ease 1s`;
      lines.classList.add('open');
    } else {
      styles = 'display: none; animation: ease 1s';
      lines.classList.remove('open');
    }
    navigation.setAttribute('style', styles);
    submenus.forEach(submenu => submenu.setAttribute('style', styles));
  }
}

import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(private auth: AuthenticationService) { }

  getMockData() {
    return {
      notifications: [],
      // notifications: [
      //   { title: 'Novas Configurações', description: 'Você realizou alteraçõs e não salvou!', icon: 'mdi-settings-outline', background: 'bg-primary' },
      //   { title: 'Fulano Ciclano', description: 'Não esqueça a reunião de hoje!', image: 'assets/images/users/avatar-1.jpg' },
      //   { title: 'Ciclano Beltrano', description: 'Há 2 Notificções no sistema para você!', icon: 'mdi-bell-outline', background: 'bg-primary' },
      //   { title: 'Beltrano Fulano', description: 'Wow! Vamos a reunião de coach hoje?', image: 'assets/images/users/avatar-4.jpg' },
      // ],
      user: { name: this.auth.currentUserValue.name, photo: '/images/users/avatar-1.jpg' }
    };
  }
}

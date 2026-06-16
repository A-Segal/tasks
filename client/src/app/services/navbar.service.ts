import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({  providedIn: 'root'})
export class NavbarService {
  navbarData = [
    {
      name: 'main', buttons: [ 
        { name: 'משימות', value:'tasks', navigate: '/tasks', disabled: false },
        { name: ' ניהול משתמשים', value:'users', navigate: '/users', disabled: false }, 
        { name: 'אודות', value:'about', navigate: '/about', disabled: false },
        { name: 'בית', value:'home', navigate: '', disabled: false },]
    },
    
  ]
  currentNavbarName: string = 'main'

  private currentNav = new BehaviorSubject<any>(this.navbarData.filter(nav => nav.name == this.currentNavbarName)[0]);
  nav$ = this.currentNav.asObservable();

  constructor() { }

  changeNavbar(name: string) {
    this.currentNavbarName = name;
    this.currentNav.next(this.navbarData.filter(nav => nav.name == this.currentNavbarName)[0])
  }

  getCurrentNavbar(page:string, child:string) {

    return  `${page}${ this.navbarData.filter(({name}) => page === name)[0].buttons
                    .filter(({value})=> child===value)[0].navigate}`;

  }

  changeButtonsDisabled(dis: boolean) {
    this.navbarData[1].buttons.forEach(button => button.disabled = dis)
  }

}

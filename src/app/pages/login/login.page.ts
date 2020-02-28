import { Component, OnInit } from '@angular/core';
import { User } from '../../interface/user';
import { FirebaseService } from '../../services/firebase.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User = {
    email: '',
    password: '',
    userName: '',
    uid: ''
  };

  constructor( private fireSvc: FirebaseService,
               public menu: MenuController ) { }

  ngOnInit() {
  }

  onLogin() {
    this.fireSvc.login(this.user);
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }

}

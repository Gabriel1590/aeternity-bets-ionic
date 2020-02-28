import { Component, OnInit } from '@angular/core';
import { User } from '../../interface/user';
import { ToastService } from '../../services/toast.service';
import { FirebaseService } from '../../services/firebase.service';
import { LoadingController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  confPassword: string;

  user: User = {
    email: '',
    password: '',
    userName: '',
    uid: '',
  };

  constructor( private toast: ToastService,
               private fireSvc: FirebaseService,
               private menu: MenuController ) { }

  ngOnInit() {
  }

  onRegister() {
    if (this.confPassword === this.user.password) {
      this.fireSvc.register(this.user);
    } else {
      this.toast.toastFailure('Password not confirmed');
    }
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }

}

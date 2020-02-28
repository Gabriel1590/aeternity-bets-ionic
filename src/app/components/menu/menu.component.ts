import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor( private fireSvc: FirebaseService,
               private toast: ToastService,
               private router: Router) { }

  ngOnInit() {}

  onLogout() {
    this.toast.toastMessage('See you later');
    this.fireSvc.logOut();
    this.router.navigateByUrl('/login');
  }

  addBalance() {

  }

}

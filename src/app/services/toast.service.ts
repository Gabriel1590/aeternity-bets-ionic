import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor( private toastController: ToastController ) { }

  async toastSuccess( message ) {
    const toast = await this.toastController.create({
        message,
        duration: 3000,
        position: 'top',
        color: 'success'
    });
    toast.present();
  }

  async toastFailure( message ) {
    const toast = await this.toastController.create({
        message,
        duration: 3000,
        position: 'top',
        color: 'danger'
    });
    toast.present();
  }

  async toastMessage( message ) {
    const toast = await this.toastController.create({
        message,
        duration: 3000
    });
    toast.present();
  }
}

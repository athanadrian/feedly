import { Injectable } from '@angular/core';
import { ToastController, AlertController } from 'ionic-angular';

@Injectable()
export class NotificationProvider {

  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController) {
  }

  createAlert(title: string, message: string, handler: any) {
    return this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Ok',
          handler: handler
        }
      ]
    }).present();
  }

  successToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top',
      cssClass: "successStyle"
    });
    toast.present();
  }

  errorToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      cssClass: "errorStyle"
    });
    toast.present();
  }

}

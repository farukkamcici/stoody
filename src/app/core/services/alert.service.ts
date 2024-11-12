import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) { }

  async presentAlert(header: string = 'Hata', message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Tamam']
    });
    await alert.present();
  }
}

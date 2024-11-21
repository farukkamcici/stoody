import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { Platform } from '@ionic/angular';
import { register } from 'swiper/element/bundle';


register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      this.initializeApp();
    });
  }

  public async initializeApp() {
    // await SplashScreen.show({
    //   showDuration: 1000,
    //   autoHide: true,
    // });
    await SplashScreen.hide();
  }

}

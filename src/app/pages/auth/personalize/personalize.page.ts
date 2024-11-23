import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ModalController, PickerController } from '@ionic/angular';
import {
  DatePickerBottomSheetComponent
} from 'src/app/components/date-picker-bottom-sheet/date-picker-bottom-sheet.component';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-personalize',
  templateUrl: './personalize.page.html',
  styleUrls: ['./personalize.page.scss'],
})
export class PersonalizePage implements OnInit {
  public hoursArray: number[] = Array.from({ length: 30 }, (_, i) => (i + 1) * 2);
  public minsArray: number[] = Array.from({ length: 36 }, (_, i) => (i + 1) * 5);
  public timeRanges: string[] = Array.from({ length: 8 }, (_, i) => {
    const start = i * 3;
    const end = start + 3;
    return `${start}:00 - ${end}:00`;
  });
  public currentStep: number = 1;
  public totalSteps: number = 6;
  public todayISO!: string;
  public userId = '';
  public percentage = ' ';
  public userData: any = {
    birthDate: new Date(),
    goal: {
      name: '',
      date: new Date()
    },
    studyDays: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
    weeklyTargetHours: 0,
    focusDuration: 40,
    breakDuration: 10,
    preferredHours: Array(8).fill(false)
  };


  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private modalController: ModalController,
    private pickerCtrl: PickerController
  ) { }

  ngOnInit() {
    const now = new Date();
    this.todayISO = now.toISOString();
    this.setPercentage();
    this.afAuth.user.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.loadUserData();
      } else {
        this.router.navigate(['auth/sign-in']);
      }
    });
  }

  loadUserData() {
    this.userService.getUserData(this.userId).subscribe((data) => {
      if (data) {
        this.userData = { ...this.userData, ...data };
        console.log("userData", this.userData)
      }
    });
  }

  public saveUserData() {
    this.userService.saveUserData(this.userId, this.userData)
      .then(() => console.log('Kullanıcı verisi güncellendi!'))
      .catch((error) => console.error('Hata:', error));
  }


  public goToNextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.setPercentage();
      console.log("userDataChanged", this.userData);

    } else if (this.currentStep === this.totalSteps) {
      this.currentStep++;
      this.setPercentage();
      this.saveUserData();
      this.router.navigate(['content/home']);
      console.log("userDataSAVED", this.userData);
    }
  }
  
  public goToPreviousStep() {
    if (this.currentStep > 1) this.currentStep--;
    this.setPercentage();
  }

  public setPercentage() {
    this.percentage = ((this.currentStep - 1) * 100 / this.totalSteps).toFixed(0);
  }

  public async openDatePicker(type: string) {
    const modal = await this.modalController.create({
      component: DatePickerBottomSheetComponent,
      cssClass: 'bottom-sheet-modal',
      breakpoints: [0, 0.4],
      initialBreakpoint: 0.4,
      componentProps: {
        selectedDate: type === 'birth' ? this.formatToISO(this.userData.birthDate) : this.formatToISO(this.userData.goal.date),
        onDateSelected: type === 'birth' ? (date: string) => this.onDateSelected(date, 'birth') : (date: string) => this.onDateSelected(date, 'goal'),
      },
    });

    await modal.present();
  }

  async openTargetPicker() {
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'hours',
          options: this.hoursArray.map(hour => ({
            text: 'Haftalık ' + hour + ' saat',
            value: hour
          })),
        },
      ],
      buttons: [
        {
          text: 'İptal',
          role: 'cancel',
        },
        {
          text: 'Tamam',
          handler: (value) => {
            this.userData.weeklyTargetHours = value.hours.value;
          },
        },
      ],
      cssClass: 'ion-picker-class'
    });
  
    await picker.present();
  }

  async openFocusPicker() {
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'focus',
          options: this.minsArray.map(hour => ({
            text: hour + ' dk odak',
            value: hour
          })),
        },
        {
          name: 'break',
          options: this.minsArray.map(min => ({
            text: min + ' dk ara',
            value: min
          })),
        },
      ],
      buttons: [
        {
          text: 'İptal',
          role: 'cancel',
        },
        {
          text: 'Tamam',
          handler: (value) => {
            this.userData.focusDuration = value.focus.value;
            this.userData.breakDuration = value.break.value;
          },
        },
      ],
      cssClass: 'ion-picker-class'
    });
  
    await picker.present();
  }

  public onDateSelected(date: string, type: string) {
    if (type === 'birth') {
      this.userData.birthDate = this.formatToISO(date);
    } else {
      this.userData.goal.date = this.formatToISO(date);
    }
  }

  formatToISO(date: string): string {
    return new Date(date).toISOString();
  }


  formatToString(date: string){
    const selectedDate = new Date(date);

    return selectedDate.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }

  public toggleDay(idx: number): void {
    this.userData.studyDays[idx] = !this.userData.studyDays[idx];
  }

  public togglePreferredHour(idx: number): void {
    this.userData.preferredHours[idx] = !this.userData.preferredHours[idx];
  }

}

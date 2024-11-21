import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DatePickerBottomSheetComponent } from 'src/app/components/date-picker-bottom-sheet/date-picker-bottom-sheet.component';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-personalize',
  templateUrl: './personalize.page.html',
  styleUrls: ['./personalize.page.scss'],
})
export class PersonalizePage implements OnInit {
  public currentStep: number = 1;
  public totalSteps: number = 6;
  showPicker = false;
  public userId = '';
  public userData: any = {
    birthDate: new Date(),
    goal: {
      name: '',
      date: ''
    },
    studyDays: [],
    weeklyTargetHours: 0,
    focusDuration: 40,
    breakDuration: 10,
    preferredHours: []
  };


  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
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
    if (this.currentStep < this.totalSteps) this.currentStep++;
  }

  public goToPreviousStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  public async openDatePicker() {
    const modal = await this.modalController.create({
      component: DatePickerBottomSheetComponent,
      cssClass: 'bottom-sheet-modal',
      breakpoints: [0, 0.4],
      initialBreakpoint: 0.4,
      componentProps: {
        selectedDate: this.formatToISO(this.userData.birthDate) ,
        onDateSelected: (date: string) => this.onDateSelected(date),
      },
    });

    await modal.present();
  }

  public onDateSelected(date: string) {
    this.userData.birthDate = this.formatToISO(date);
  }
  
  formatToISO(date: string): string {
    const isoDate = new Date(date).toISOString();
    return isoDate;
  }
  

  formatToString(date: string){
    const selectedDate = new Date(date);

    return selectedDate.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }

}

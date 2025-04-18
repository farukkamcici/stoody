import { Component, OnInit } from '@angular/core';
import { ModalController, PickerController } from '@ionic/angular';
import { DatePickerBottomSheetComponent } from 'src/app/components/date-picker-bottom-sheet/date-picker-bottom-sheet.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  public hoursArray: number[] = Array.from({ length: 30 }, (_, i) => (i + 1) * 2);
  public minsArray: number[] = Array.from({ length: 36 }, (_, i) => (i + 1) * 5);
  public timeRanges: string[] = Array.from({ length: 8 }, (_, i) => {
    const start = i * 3;
    const end = start + 3;
    return `${start}:00 - ${end}:00`;
  });

  public user: any = {
    birthDate: new Date(),
    goal: { name: '', date: new Date() },
    studyDays: Array(7).fill(false),
    weeklyTargetHours: 0,
    focusDuration: 40,
    breakDuration: 10,
    preferredHours: Array(8).fill(false),
  };

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private modalController: ModalController,
    private pickerCtrl: PickerController
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        if (user) {
          this.userService.getUserData(user.uid).subscribe((data: any) => {
            this.user = { ...this.user, ...data }; // Merge existing data with defaults
            console.log('Loaded user data:', this.user);
          });
        }
      },
      error: (err) => console.error('Error fetching user:', err),
    });
  }

  saveChanges() {
    if (!this.user) {
      console.error('No user data to save.');
      return;
    }

    this.userService.saveUserData(this.user.uid, this.user)
      .then(() => console.log('User data updated successfully!'))
      .catch((err) => console.error('Error saving user data:', err));
  }

  async openDatePicker(type: string) {
    const modal = await this.modalController.create({
      component: DatePickerBottomSheetComponent,
      cssClass: 'bottom-sheet-modal',
      breakpoints: [0, 0.4],
      initialBreakpoint: 0.4,
      componentProps: {
        selectedDate: type === 'birth' ? this.formatToISO(this.user.birthDate) : this.formatToISO(this.user.goal.date),
        onDateSelected: (date: string) => this.onDateSelected(date, type),
      },
    });

    await modal.present();
  }

  async openTargetPicker() {
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'hours',
          options: this.hoursArray.map((hour) => ({
            text: 'Haftalık ' + hour + ' saat',
            value: hour,
          })),
        },
      ],
      buttons: [
        { text: 'İptal', role: 'cancel' },
        {
          text: 'Tamam',
          handler: (value) => {
            this.user.weeklyTargetHours = value.hours.value;
          },
        },
      ],
      cssClass: 'ion-picker-class',
    });

    await picker.present();
  }

  async openFocusPicker() {
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'focus',
          options: this.minsArray.map((mins) => ({
            text: mins + ' dk odak',
            value: mins,
          })),
        },
        {
          name: 'break',
          options: this.minsArray.map((mins) => ({
            text: mins + ' dk ara',
            value: mins,
          })),
        },
      ],
      buttons: [
        { text: 'İptal', role: 'cancel' },
        {
          text: 'Tamam',
          handler: (value) => {
            this.user.focusDuration = value.focus.value;
            this.user.breakDuration = value.break.value;
          },
        },
      ],
      cssClass: 'ion-picker-class',
    });

    await picker.present();
  }

  onDateSelected(date: string, type: string) {
    if (type === 'birth') {
      this.user.birthDate = this.formatToISO(date);
    } else if (type === 'goal') {
      this.user.goal.date = this.formatToISO(date);
    }
  }

  formatToISO(date: string): string {
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime()) ? '' : parsedDate.toISOString();
  }

  formatToString(date: string): string {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }

  toggleDay(idx: number) {
    if (idx >= 0 && idx < this.user.studyDays.length) {
      this.user.studyDays[idx] = !this.user.studyDays[idx];
    } else {
      console.error('Invalid day index:', idx);
    }
  }

  togglePreferredHour(idx: number) {
    if (idx >= 0 && idx < this.user.preferredHours.length) {
      this.user.preferredHours[idx] = !this.user.preferredHours[idx];
    } else {
      console.error('Invalid hour index:', idx);
    }
  }
}

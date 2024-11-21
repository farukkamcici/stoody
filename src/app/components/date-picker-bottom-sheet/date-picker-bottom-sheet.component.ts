import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-date-picker-bottom-sheet',
  templateUrl: './date-picker-bottom-sheet.component.html',
})
export class DatePickerBottomSheetComponent {
  @Input() selectedDate: string = '';
  @Input() onDateSelected!: (date: string) => void;

  constructor(private modalController: ModalController) {}

  onDateChange(event: any) {
    this.selectedDate = event.detail.value;
  }

  confirmDate() {
    if (this.onDateSelected) {
      this.onDateSelected(this.selectedDate);
    }
    this.closeBottomSheet();
  }

  closeBottomSheet() {
    this.modalController.dismiss();
  }
}

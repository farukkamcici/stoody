import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DatePickerBottomSheetComponent } from './date-picker-bottom-sheet.component';



@NgModule({
  declarations: [DatePickerBottomSheetComponent

  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    DatePickerBottomSheetComponent
  ]
})
export class DatePickerBottomSheetModule { }

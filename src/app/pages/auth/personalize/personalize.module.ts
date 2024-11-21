import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalizePageRoutingModule } from './personalize-routing.module';

import { DatePickerBottomSheetModule } from 'src/app/components/date-picker-bottom-sheet/date-picker-bottom-sheet.module';
import { PersonalizePage } from './personalize.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalizePageRoutingModule,
    DatePickerBottomSheetModule,
  ],
  declarations: [PersonalizePage],
  providers: [
    DatePipe
  ],
})
export class PersonalizePageModule {}

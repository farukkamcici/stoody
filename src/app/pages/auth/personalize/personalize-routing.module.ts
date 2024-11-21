import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalizePage } from './personalize.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalizePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalizePageRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentPage } from './content.page';

const routes: Routes = [
  {
    path: '',
    component: ContentPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'plan',
        loadChildren: () => import('./plan/plan.module').then(m => m.PlanPageModule)
      },
      {
        path: 'community',
        loadChildren: () => import('./community/community.module').then(m => m.CommunityPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'profile-edit',
    loadChildren: () => import('./profile-edit/profile-edit.module').then( m => m.ProfileEditPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPageRoutingModule { }

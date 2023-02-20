import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GroupListComponent } from './pages/group-list/group-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'group-list', component: GroupListComponent },
      { path: '**', redirectTo: 'team-list' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }

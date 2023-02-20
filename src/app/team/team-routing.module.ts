import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamListComponent } from './pages/team-list/team-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'team-list', component: TeamListComponent },
      { path: '**', redirectTo: 'team-list' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }

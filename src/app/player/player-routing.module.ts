import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayerListComponent } from './pages/player-list/player-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'player-list', component: PlayerListComponent },
      { path: '**', redirectTo: 'team-list' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }

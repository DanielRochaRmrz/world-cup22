import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'group',
    loadChildren: () => import('./group/group.module').then( m => m.GroupModule )
  },
  {
    path: 'player',
    loadChildren: () => import('./player/player.module').then( m => m.PlayerModule )
  },
  {
    path: 'team',
    loadChildren: () => import('./team/team.module').then( m => m.TeamModule )
  },
  {
    path: '**',
    redirectTo: 'team'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

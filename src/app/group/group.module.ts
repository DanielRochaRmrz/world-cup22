import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupListComponent } from './pages/group-list/group-list.component';
import { MaterialModule } from '../material.module';

import { StarRatingModule } from 'angular-star-rating';
import { PlayerTeamComponent } from './pages/player-team/player-team.component';


@NgModule({
  declarations: [
    GroupListComponent,
    PlayerTeamComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    MaterialModule,
    StarRatingModule.forRoot()
  ]
})
export class GroupModule { }

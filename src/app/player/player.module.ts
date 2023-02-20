import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import { PlayerListComponent } from './pages/player-list/player-list.component';
import { PlayerRegisterComponent } from './pages/player-register/player-register.component';
import { PlayerEditComponent } from './pages/player-edit/player-edit.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';
import { GetTeamPipe } from './pipes/get-team.pipe';


@NgModule({
  declarations: [
    PlayerListComponent,
    PlayerRegisterComponent,
    PlayerEditComponent,
    GetTeamPipe
  ],
  imports: [
    CommonModule,
    PlayerRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StarRatingModule.forRoot()
  ]
})
export class PlayerModule { }

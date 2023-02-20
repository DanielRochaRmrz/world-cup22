import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { TeamListComponent } from './pages/team-list/team-list.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';
import { TeamRegisterComponent } from './pages/team-register/team-register.component';
import { TeamEditComponent } from './pages/team-edit/team-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';


@NgModule({
  declarations: [
    TeamListComponent,
    TeamRegisterComponent,
    TeamEditComponent
  ],
  imports: [
    CommonModule,
    TeamRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StarRatingModule.forRoot()
  ],
  exports: [
    TeamListComponent
  ]
})
export class TeamModule { }

import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { GroupData } from 'src/app/team/interface/group.interface';
import { teamData } from 'src/app/team/interface/team.interface';
import groupsData from '../../../../assets/json/groups.json';

import { PlayerTeamComponent } from '../player-team/player-team.component';

import { TeamService } from '../../../team/services/team.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  // data de grupos para cargar en el select
  grups: GroupData[] = groupsData;

  // data de equipos para cargar en el select
  teams: teamData[] = []

  constructor(public dialog: MatDialog, private teamService: TeamService) {

  }

  ngOnInit(): void {

    this.getAllTeams();

  }

  async getAllTeams() {
    this.teams = await this.teamService.getAll();
  }

  async showPlayerTeam(uidTeam: string) {
    const team = await this.teamService.getTeam(uidTeam);

    this.dialog.open(PlayerTeamComponent, {
      data: { uidTeam: uidTeam, team: team },
    });
  }

}

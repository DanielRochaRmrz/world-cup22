import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { teamObj } from 'src/app/team/interface/team.interface';
import { playerTable } from 'src/app/player/interface/player.interface';

import { PlayerService } from '../../../player/services/player.service';

@Component({
  selector: 'app-player-team',
  templateUrl: './player-team.component.html',
  styleUrls: ['./player-team.component.scss']
})
export class PlayerTeamComponent implements OnInit {

  dataSource: playerTable[] = [];
  displayedColumns: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<PlayerTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: teamObj,
    private playerServices: PlayerService
  ) {

  }

  ngOnInit(): void {

    this.getAllPlayer()

  }

  async getAllPlayer() {
    const players: playerTable[]  = await this.playerServices.getPlayerTeam(this.data.uidTeam);
    this.displayedColumns = ['nombre', 'edad', 'camiseta'];
    this.dataSource = players;
  }

  // cerrar dialog
  closeDialog(): void {
    this.dialogRef.close();
  }
}

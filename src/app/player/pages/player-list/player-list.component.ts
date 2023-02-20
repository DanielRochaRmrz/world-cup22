import { AfterViewInit, Component, ViewChild } from '@angular/core';

import Swal from 'sweetalert2';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { playerData } from '../../interface/player.interface';

import { PlayerRegisterComponent } from '../player-register/player-register.component';
import { PlayerEditComponent } from '../player-edit/player-edit.component';

import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements AfterViewInit {


  displayedColumns: string[] = [
    'id',
    'nombre',
    'edad',
    'camiseta',
    'equipo',
    'acciones',
  ];
  dataSource!: MatTableDataSource<playerData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private playerServices: PlayerService) {}

  ngAfterViewInit() {
    this.dataSourceInit();
  }


  async dataSourceInit() {
    const players: playerData[] = await this.playerServices.getAll();
    this.dataSource = new MatTableDataSource(players);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  newPlayer(): void {
    const dialogRef = this.dialog.open(PlayerRegisterComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.dataSourceInit();
    });
  }

  async editPlayer(uidPlayer: string) {
    const player = await this.playerServices.getPlayer(uidPlayer);

    const dialogRef = this.dialog.open(PlayerEditComponent, {
      data: { uidTeam: uidPlayer, player: player },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.dataSourceInit();
    });
  }

  deletePlayer(uidPlayer: string) {
    Swal.fire({
      title: '¿Está seguro de eliminar este jugador?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3f51b5',
      cancelButtonColor: '#f44336',
      confirmButtonText: '¡Sí, bórralo!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const team: any = await this.playerServices.deletePlayer(uidPlayer);
        if (team.success) {
          this.dataSourceInit();
          Swal.fire({
            icon: 'success',
            title: '¡El jugador ha sido eliminado con exito!',
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    });
  }

}

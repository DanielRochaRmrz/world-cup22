import { AfterViewInit, Component, ViewChild } from '@angular/core';

import Swal from 'sweetalert2';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { teamData } from '../../interface/team.interface';

import { TeamEditComponent } from '../team-edit/team-edit.component';
import { TeamRegisterComponent } from '../team-register/team-register.component';

import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
})
export class TeamListComponent implements AfterViewInit {

  displayedColumns: string[] = [
    'id',
    'equipo',
    'rendimiento',
    'grupo',
    'acciones',
  ];
  dataSource!: MatTableDataSource<teamData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private teamService: TeamService) {}

  ngAfterViewInit() {
    this.dataSourceInit();
  }


  async dataSourceInit() {
    const teams: teamData[] = await this.teamService.getAll();
    this.dataSource = new MatTableDataSource(teams);
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

  newTeam(): void {
    const dialogRef = this.dialog.open(TeamRegisterComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.dataSourceInit();
    });
  }

  async editTeam(uidTeam: string) {
    const team = await this.teamService.getTeam(uidTeam);

    const dialogRef = this.dialog.open(TeamEditComponent, {
      data: { uidTeam: uidTeam, team: team },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.dataSourceInit();
    });
  }

  deleteTeam(uidTeam: string) {
    Swal.fire({
      title: '¿Está seguro de eliminar este equipo?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3f51b5',
      cancelButtonColor: '#f44336',
      confirmButtonText: '¡Sí, bórralo!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const team: any = await this.teamService.deleteTeam(uidTeam);
        if (team.success) {
          this.dataSourceInit();
          Swal.fire({
            icon: 'success',
            title: '¡El equipo ha sido eliminado con exito!',
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    });
  }
}

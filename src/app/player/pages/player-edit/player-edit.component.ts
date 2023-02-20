import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2'


import { teamData } from '../../../team/interface/team.interface';
import { playerObj } from '../../interface/player.interface';


import { PlayerService } from '../../services/player.service';
import { TeamService } from 'src/app/team/services/team.service';



@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.scss']
})
export class PlayerEditComponent implements OnInit {

  // data de equipos para cargar en el select
  teams: teamData[] = []

   // cración del formuario
   registerForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    edad: [ Validators.required, Validators.min(1) ],
    numero: [ Validators.required, Validators.min(1) ],
    equipo: ['', Validators.required]
  });

  get ageErrorMsg(): string {
    const errors = this.registerForm.get('edad')?.errors;

    if (errors?.['required']) {
      return 'El campo edad es obligatorio';
    } else if (errors?.['min']) {
      return 'El campo edad debe ser mayor a 0';
    }
    return '';
  }

  get numberErrorMsg(): string {
    const errors = this.registerForm.get('numero')?.errors;

    if (errors?.['required']) {
      return 'El campo numero de camiseta es obligatorio';
    } else if (errors?.['min']) {
      return 'El campo numero de camiseta debe ser mayor a 0';
    }
    return '';
  }

  constructor(
    public dialogRef: MatDialogRef<PlayerEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: playerObj,
    private fb: FormBuilder,
    private playerService: PlayerService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.getAllTeams();
    this.registerForm.get('nombre')?.setValue(this.data.player.nombre);
    this.registerForm.get('edad')?.setValue(this.data.player.edad);
    this.registerForm.get('numero')?.setValue(this.data.player.numero);
    this.registerForm.get('equipo')?.setValue(this.data.player.equipo);
  }

  //obtener todos ls equipos registrados
  async getAllTeams() {
    this.teams = await this.teamService.getAll();
  }

  // marcar datos invalidos
  invalidField(campo: string) {
    return (
      this.registerForm.get(campo)?.invalid &&
      this.registerForm.get(campo)?.touched
    );
  }

  // registrar nuevo equipo
  async updatePlayer() {
    // si nuestro formulario es invalido marcar campos faltantes y detener metodo
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    // Extraemos el uid de la data
    const uid = this.data.player.uid;
    // obtenemos los datos registrados en el formulario
    const player = this.registerForm.value;

    //Obtenemos respuesta del nuevo registro
    const newTeam: any = await this.playerService.editPlayer(uid, player);
    if (newTeam.success) {
      Swal.fire({
        icon: 'success',
        title: '¡El jugador se actualizado con exito!',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.dialogRef.close();
      })
    }

  }

  // cerrar dialog
  closeDialog(): void {
    this.dialogRef.close();
  }

}

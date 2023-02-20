
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2'

import { teamData } from 'src/app/team/interface/team.interface';

import { PlayerService } from '../../services/player.service';
import { TeamService } from '../../../team/services/team.service';

@Component({
  selector: 'app-player-register',
  templateUrl: './player-register.component.html',
  styleUrls: ['./player-register.component.scss']
})
export class PlayerRegisterComponent implements OnInit {

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
    public dialogRef: MatDialogRef<PlayerRegisterComponent>,
    private fb: FormBuilder,
    private playerService: PlayerService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
      this.getAllTeams();
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

  // registrar nuevo jugador
  async registerPlayer() {
    // si nuestro formulario es invalido marcar campos faltantes y detener metodo
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    // obtenemos los datos registrados en el formulario
    const player = this.registerForm.value;

    //Obtenemos respuesta del nuevo registro
    const newPlayer: any = await this.playerService.addPlayer(player);
    if (newPlayer.success) {
      Swal.fire({
        icon: 'success',
        title: '¡El jugador se agrego con exito!',
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

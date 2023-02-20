import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2'

import { StarData } from '../../interface/star.interface';
import { GroupData } from '../../interface/group.interface';
import { teamObj } from '../../interface/team.interface';

import starsData from '../../../../assets/json/star.json';
import groupsData from '../../../../assets/json/groups.json';

import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.scss']
})
export class TeamEditComponent implements OnInit {

  // data de grupos para cargar en el select
  stars: StarData[] = starsData;

  // data de grupos para cargar en el select
  grups: GroupData[] = groupsData;

  // cración del formuario
  registerForm: FormGroup = this.fb.group({
    equipo: ['', Validators.required],
    rendimiento: ['', Validators.required],
    grupo: ['', Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<TeamEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: teamObj,
    private fb: FormBuilder,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.registerForm.get('equipo')?.setValue(this.data.team.equipo);
    this.registerForm.get('rendimiento')?.setValue(this.data.team.rendimiento);
    this.registerForm.get('grupo')?.setValue(this.data.team.grupo);
  }

  // marcar datos invalidos
  invalidField(campo: string) {
    return (
      this.registerForm.get(campo)?.invalid &&
      this.registerForm.get(campo)?.touched
    );
  }

  // registrar nuevo equipo
  async updateTeam() {
    // si nuestro formulario es invalido marcar campos faltantes y detener metodo
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    // Extraemos el uid de la data
    const uid = this.data.team.uid;
    // obtenemos los datos registrados en el formulario
    const team = this.registerForm.value;

    //Obtenemos respuesta del nuevo registro
    const newTeam: any = await this.teamService.editTeam(uid, team);
    if (newTeam.success) {
      Swal.fire({
        icon: 'success',
        title: '¡El equipo se actualizado con exito!',
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

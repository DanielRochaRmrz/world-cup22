import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2'

import { GroupData } from '../../interface/group.interface';
import groupsData from '../../../../assets/json/groups.json';

import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-team-register',
  templateUrl: './team-register.component.html',
  styleUrls: ['./team-register.component.scss']
})
export class TeamRegisterComponent {

  // data de grupos para cargar en el select
  grups: GroupData[] = groupsData;

  // cración del formuario
  registerForm: FormGroup = this.fb.group({
    equipo: ['', Validators.required],
    rendimiento: ['', Validators.required],
    grupo: ['', Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<TeamRegisterComponent>,
    private fb: FormBuilder,
    private teamService: TeamService
  ) {}

  // marcar datos invalidos
  invalidField(campo: string) {
    return (
      this.registerForm.get(campo)?.invalid &&
      this.registerForm.get(campo)?.touched
    );
  }

  // registrar nuevo equipo
  async registerTeam() {
    // si nuestro formulario es invalido marcar campos faltantes y detener metodo
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    // obtenemos los datos registrados en el formulario
    const team = this.registerForm.value;

    //Obtenemos respuesta del nuevo registro
    const newTeam: any = await this.teamService.addTeam(team);
    if (newTeam.success) {
      Swal.fire({
        icon: 'success',
        title: '¡El equipo se agrego con exito!',
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

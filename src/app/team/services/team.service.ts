import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/compat/firestore';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs'

import { teamData } from '../interface/team.interface';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private teamsCollection!: AngularFirestoreCollection<teamData>;
  teams!: Observable<teamData[]>;

  constructor(private readonly firestore: Firestore, private afs: AngularFirestore) {
    this.teamsCollection = this.afs.collection<teamData>('team');
  }

  //obtener colección con su respectivo uid
  getAll() {
    return new Promise<teamData[]>((resolve, reject) => {
      this.teams = this.teamsCollection.valueChanges({ idField: 'uid' });
      this.teams
        .forEach((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }

   //obtener colección con su respectivo uid
   getTeam(uid: string) {
    return new Promise((resolve, reject) => {
      const teamDocumentReference = doc(this.firestore, `team/${uid}`);
      const team = docData(teamDocumentReference, { idField: 'uid' });
      team.forEach((data) => {
        resolve(data);
      }).catch(err => reject(err));
    })
  }


  //agregar un nuevo equipo a la colleción
  addTeam(team: teamData) {
    return new Promise((resolve, reject) => {
      this.teamsCollection
        .add(team)
        .then((resp) => {
          resolve({ success: true, uid: resp.id });
        })
        .catch((err) => reject(err));
    });
  }

  //editar equipo de la colleción
  editTeam(uid: string, team: teamData) {
    return new Promise((resolve, reject) => {
      console.log(uid);

      this.teamsCollection
        .doc(uid).update(team)
        .then((resp) => {
          resolve({ success: true, uid: resp });
        })
        .catch((err) => reject(err));
    });
  }

  //eliminar equipo de la colleción
  deleteTeam(uid: string) {
    return new Promise((resolve, reject) => {
      console.log(uid);

      this.teamsCollection
        .doc(uid).delete()
        .then((resp) => {
          resolve({ success: true });
        })
        .catch((err) => reject(err));
    });
  }

}

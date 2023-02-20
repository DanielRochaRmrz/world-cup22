import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { playerData } from '../interface/player.interface';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private playerCollection!: AngularFirestoreCollection<playerData>;
  player!: Observable<playerData[]>;

  constructor(
    private readonly firestore: Firestore,
    private afs: AngularFirestore
  ) {
    this.playerCollection = this.afs.collection<playerData>('player');
  }

  //obtener colección con su respectivo uid
  getAll() {
    return new Promise<playerData[]>((resolve, reject) => {
      this.player = this.playerCollection.valueChanges({ idField: 'uid' });
      this.player
        .forEach((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }

  //obtener colección donde sea igual al id del equipo
  getPlayerTeam(uidTeam: string) {
    return new Promise<playerData[]>((resolve, reject) => {
      const player = this.afs
        .collection('player', (ref) => ref.where('equipo', '==', uidTeam))
        .valueChanges();
      player
        .forEach((data: any) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }

  //obtener colección con su respectivo uid
  getPlayer(uid: string) {
    return new Promise((resolve, reject) => {
      const playerDocumentReference = doc(this.firestore, `player/${uid}`);
      const player = docData(playerDocumentReference, { idField: 'uid' });
      player
        .forEach((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }

  //agregar un nuevo jugador a la colleción
  addPlayer(player: playerData) {
    return new Promise((resolve, reject) => {
      this.playerCollection
        .add(player)
        .then((resp) => {
          resolve({ success: true, uid: resp.id });
        })
        .catch((err) => reject(err));
    });
  }

  //editar jugador de la colleción
  editPlayer(uid: string, player: playerData) {
    return new Promise((resolve, reject) => {
      console.log(uid);

      this.playerCollection
        .doc(uid)
        .update(player)
        .then((resp) => {
          resolve({ success: true, uid: resp });
        })
        .catch((err) => reject(err));
    });
  }

  //eliminar equipo de la colleción
  deletePlayer(uid: string) {
    return new Promise((resolve, reject) => {
      console.log(uid);

      this.playerCollection
        .doc(uid)
        .delete()
        .then((resp) => {
          resolve({ success: true });
        })
        .catch((err) => reject(err));
    });
  }
}

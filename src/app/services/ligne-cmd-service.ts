import { Injectable, signal } from '@angular/core';
import { LigneCmd } from '../models/LigneCmd';
import { db } from './db-service';

@Injectable({
  providedIn: 'root',
})
export class LigneCmdService {
  lignes = signal<LigneCmd[]>([]);
  constructor(){
    this.loadLignes();
  }
  getLignes(){
    return this.lignes;
  }
 async AddLigne(ligne:LigneCmd){
  await db.lignes.add(ligne);
   this.lignes.update(lignes => [...lignes,ligne]);
  }
 async SupprimerLigne(id:number){
  await db.lignes.delete(id);
    this.lignes.update(lignes => lignes.filter(l => l.idLigne !== id));
  }

  async loadLignes(){
    const lignes = await db.lignes.toArray();
    this.lignes.set(lignes);
  }
}

import { Injectable, signal } from '@angular/core';
import { Facture } from '../models/Facture';
import { db } from './db-service';

@Injectable({
  providedIn: 'root',
})
export class FactureService {
  factures = signal<Facture[]>([]);
  constructor(){
    this.loadFactures();
  }
  getFactures(){
    return this.factures;
  }
 async AddFacture(facture:Facture){
    await db.factures.add(facture);
    this.factures.update(factures => [...factures,facture]);
  }
 async deleteFacture(id:number){
    await db.factures.delete(id);
    this.factures.update(factures => factures.filter(f => f.numFacture !== id));
  }

  async loadFactures(){
    const factures = await db.factures.toArray();
    this.factures.set(factures);
  }
}

// db.service.ts
import Dexie, { Table } from 'dexie';
import { Client } from '../models/Client';
import { Produit } from '../models/Produit';
import { Facture } from '../models/Facture';
import { LigneCmd } from '../models/LigneCmd';

export class AppDatabase extends Dexie {
    
  clients!: Table<Client, number>;
  produits!: Table<Produit, number>;
  factures!: Table<Facture, number>;
  lignes!: Table<LigneCmd, number>;

  constructor() {
    super('AppDatabase');
    this.version(1).stores({
      clients: '++clientId, nom, prenom',
      produits: '++numProduit, nom, prix',
      factures: '++numFacture, clientId, total, date',
      lignes: '++idLigne, numFacture, produitId, qte'
    });
  }
}

export const db = new AppDatabase();
import { Injectable, signal } from '@angular/core';
import { Produit } from '../models/Produit';
import { db } from './db-service';

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  produits = signal<Produit[]>([]);

  constructor() {
    this.loadProduits();
  }

  async loadProduits() {
    const allProduits = await db.produits.toArray();
    this.produits.set(allProduits);
  }

  getProduits() {
    return this.produits;
  }

  async addProduit(produit: Produit) {
    await db.produits.add(produit);
    this.produits.update((produits) => [...produits, produit]);
  }

  async deleteProduit(num: number) {
    await db.produits.delete(num);
    this.produits.update((produits) => produits.filter((produit) => produit.numProduit !== num));
  }

  async updateProduit(produit: Produit) {
    await db.produits.put(produit);
    this.produits.update((produits) =>
      produits.map((p) => (p.numProduit === produit.numProduit ? produit : p))
    );
  }
}

import { Component, inject, signal } from '@angular/core';
import { Produit } from '../models/Produit';
import { ProduitService } from '../services/produit-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produits',
  imports: [FormsModule],
  templateUrl: './produits.html',
})
export class Produits {
  private produitService = inject(ProduitService);
  produits = this.produitService.getProduits();
  nom = signal('');
  prix = signal(0);
  editNum = signal<number | null>(null);


  async saveProduit(e: Event) {
    e.preventDefault();

    const num = this.editNum();

    if (num !== null) {
      const updatedProduit = new Produit(this.nom(), this.prix());
      updatedProduit.numProduit = num;
      await this.produitService.updateProduit(updatedProduit);
      this.editNum.set(null);
    } else {
      const newProduit = new Produit(this.nom(), this.prix());
      await this.produitService.addProduit(newProduit);
    }

    this.nom.set('');
    this.prix.set(0);
  }

  async supprimerProduit(num: number) {
    await this.produitService.deleteProduit(num);
  }

  modifierProduit(num: number) {
    const produit = this.produits().find((p) => p.numProduit === num);
    if (!produit) return;
    this.nom.set(produit.nom);
    this.prix.set(produit.prix);
    this.editNum.set(num);
  }

  cancel() {
    const num = this.editNum();
    if (num !== null) {
      this.editNum.set(null);
      this.nom.set('');
      this.prix.set(0);
    }
  }
}

import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LigneCmdService } from '../services/ligne-cmd-service';
import { ProduitService } from '../services/produit-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-facture-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './facture-detail.html',
})
export class FactureDetail {
  private route = inject(ActivatedRoute);
  private lignesService = inject(LigneCmdService);
  private produitService = inject(ProduitService);
  
  lignes = this.lignesService.getLignes();
  produits = this.produitService.getProduits();
  factureId: number;

  constructor() {
    this.factureId = +this.route.snapshot.paramMap.get('id')!;
  }

  getProduitNom(produitId: number) {
    const produit = this.produits().find(p => p.numProduit === produitId);
    if(!produit) return;
    return produit.nom;
  }

  getProduitPrix(produitId: number) {
    const produit = this.produits().find(p => p.numProduit === produitId);
    return produit ? produit.prix : 0;
  }

  getTotal(produitId: number, qte: number) {
    return this.getProduitPrix(produitId) * qte;
  }

  getFactureTotal() {
    return this.lignes()
      .filter(ligne => ligne.numFacture === this.factureId)
      .reduce((total, ligne) => total + this.getTotal(ligne.produitId, ligne.qte), 0);
  }
}
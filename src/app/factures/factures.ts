import { Component, inject, signal } from '@angular/core';
import { ClientService } from '../services/client-service';
import { ProduitService } from '../services/produit-service';
import { FormsModule } from '@angular/forms';
import { FactureService } from '../services/facture-service';
import { Facture } from '../models/Facture';
import { LigneCmdService } from '../services/ligne-cmd-service';
import { LigneCmd } from '../models/LigneCmd';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-factures',
  imports: [FormsModule,RouterLink],
  templateUrl: './factures.html',
})
export class Factures {
  private clientService = inject(ClientService);
  clients = this.clientService.getClients();
  private produitService = inject(ProduitService);
  produits = this.produitService.getProduits();
  private factureService = inject(FactureService);
  factures = this.factureService.getFactures();
  private ligneService = inject(LigneCmdService);

  clientId = signal<number | null>(null);
  date = signal('');
  qte: { [key: number]: number } = {};
  constructor() {
    this.produits().forEach((p) => (this.qte[p.numProduit] = 0));
  }
  lignes: {
    [key: number]: {
      qte: number;
      prix: number;
    };
  } = {};
  Add(id: number) {
    if (!this.qte[id] && this.qte[id] <= 0) return;
    let produit = this.produits().find((pro) => pro.numProduit === id);
    if (!produit) return;
    this.lignes[id] = {
      qte: this.qte[id],
      prix: produit.prix,
    };
  }
  Remove(id: number) {
    delete this.lignes[id];
  }
  getTotal() {
    let total = 0;
    Object.entries(this.lignes).forEach(([key, value]) => {
      total += value.prix * value.qte;
    });
    return total;
  }
  getNomClient(id:number){
    let client = this.clients().find(c => c.clientId == id);
    return client?.nom;
  }
 async saveFacture(e:Event){
    e.preventDefault();
    const clientId = this.clientId();
    if(clientId === null )return;
    const facture = new Facture(clientId,this.getTotal(),this.date());
    
   await this.factureService.AddFacture(facture);
    Object.entries(this.lignes).forEach(([key,value]) => {
       this.ligneService.AddLigne(new LigneCmd(facture.numFacture,+key,value.qte));
    });
    console.log(this.ligneService.getLignes());
  }

}

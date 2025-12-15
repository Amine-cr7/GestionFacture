import { Routes } from '@angular/router';
import { Clients } from './clients/clients';
import { Produits } from './produits/produits';
import { Factures } from './factures/factures';
import { FactureDetail } from './facture-detail/facture-detail';

export const routes: Routes = [
  { path: 'clients', component: Clients },
  { path: 'produits', component: Produits },
  {path:'factures',component:Factures},
  { path: 'factures/:id', component: FactureDetail },
];
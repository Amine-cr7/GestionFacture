import { Component, inject, signal } from '@angular/core';
import { Client } from '../models/Client';
import { ClientService } from '../services/client-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clients',
  imports: [FormsModule],
  templateUrl: './clients.html',
})
export class Clients {

    private clientService = inject(ClientService);
    clients = this.clientService.getClients();
    nom = signal('');
    prenom = signal('');
    editId = signal<number | null>(null);

   async saveClient(e: Event){
      e.preventDefault();
      
      const id = this.editId();
      
      if(id !== null){
        const updatedClient = new Client(this.nom(), this.prenom());
        updatedClient.clientId = id;
        await this.clientService.updateClient(updatedClient);
        this.editId.set(null);
      } else {
        const newClient = new Client(this.nom(), this.prenom());
      await  this.clientService.addClient(newClient);
      }
      this.nom.set('');
      this.prenom.set('');
    }

   async supprimerClient(id:number){
     await this.clientService.deleteClient(id);
    }
    modifierClient(id:number){
      const client = this.clients().find(c => c.clientId === id );
      if(!client) return;
      this.nom.set(client.nom);
      this.prenom.set(client.prenom);
      this.editId.set(id);
    }
    cancel(){
      const id = this.editId();
      if(id !== null){
        this.editId.set(null);
        this.nom.set('');
        this.prenom.set('');
      }
    }

}

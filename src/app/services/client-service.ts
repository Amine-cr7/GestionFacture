import { Injectable, signal } from '@angular/core';
import { Client } from '../models/Client';
import { db } from './db-service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  clients = signal<Client[]>([]);
  constructor() {
    this.loadClients();
  }

  getClients() {
    return this.clients;
  }
  async addClient(client: Client) {
    await db.clients.add(client);
    this.clients.update((clients) => [...clients, client]);
  }
  async deleteClient(id: number) {
    await db.clients.delete(id);
    this.clients.update((clients) => clients.filter((client) => client.clientId !== id));
  }
  async updateClient(client: Client) {
    await db.clients.put(client);
    this.clients.update((clients) =>
      clients.map((c) => (c.clientId === client.clientId ? client : c))
    );
  }
  async loadClients() {
    const allClients = await db.clients.toArray();
    this.clients.set(allClients);
  }
}

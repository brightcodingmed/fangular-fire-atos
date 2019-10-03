import { Client } from './../models/client';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientCollection: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore) {
    this.clientCollection = this.afs.collection('clients', ref => ref.where('active', '==', true));
   }

  getClients() {
      return this.clientCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Client;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  addClient(data: Client) {
    return this.clientCollection.add(data);
  }

  destroyClient(id: string) {
    return this.clientCollection.doc(id).delete();
  }

  toggleActiveClient(id, active) {
    return this.clientCollection.doc(id).update({
      active: !active
    });
  }
}

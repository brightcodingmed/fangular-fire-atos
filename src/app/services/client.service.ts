import { Client } from './../models/client';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientCollection: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore) {
    this.clientCollection = this.afs.collection('clients');
   }

  getClients() {
      return this.clientCollection.valueChanges();
  }
}

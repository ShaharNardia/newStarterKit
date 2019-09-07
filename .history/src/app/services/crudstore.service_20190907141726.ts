import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudstoreService {

  constructor(private firestore: AngularFirestore) { }

  insertToDB(collectionName,documents) {
    for (let index = 0; index < documents.length; index++) {
      this.firestore.collection(collectionName).add(documents[index]);
    }
  }
}

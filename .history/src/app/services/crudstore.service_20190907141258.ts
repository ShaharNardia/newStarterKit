import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudstoreService {

  constructor(private firestore: AngularFirestore) { }

  insertPosts(posts) {
    for (let index = 0; index < posts.length; index++) {
      this.firestore.collection('posts').add(posts[index]);
    }
  }
}

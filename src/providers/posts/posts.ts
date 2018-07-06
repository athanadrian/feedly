import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

import { NotificationProvider } from './../notification/notification';

import firebase from 'firebase';

import { Post } from '../../models/post';

@Injectable()
export class PostsProvider {

  posts: any[] = [];
  pageSize: number = 10;
  current: any;
  infiniteEvent: any;
  addCounter: number = 0;

  constructor(
    private loadingCtrl: LoadingController,
    private notificationProvider: NotificationProvider) {
  }

  createPost(text: string) {
    firebase.firestore().collection("posts").add({
      text: text,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      ownerId: firebase.auth().currentUser.uid,
      ownerName: firebase.auth().currentUser.displayName
    }).then((doc) => {

      if (this.infiniteEvent) {
        this.infiniteEvent.enable(true);
      }

      this.notificationProvider.successToast('Your post has created successfully.');

    }).catch((err) => {
      console.log(err);
    });
  }

  getPosts() {
    this.posts = [];

    let loader = this.loadingCtrl.create({
      content: 'loading complex feed......'
    });
    loader.present();

    let query = firebase.firestore().collection("posts")
      .orderBy('created', 'desc')
      .limit(this.pageSize);

    // query.onSnapshot((snapshot) => {
    //   let changedDocs = snapshot.docChanges();
    //   changedDocs.forEach((doc) => {
    //     if (doc.type == 'added') {
    //     };
    //     if (doc.type == 'modified') {
    //       console.log('Doc ' + doc.doc.id + ' modified');
    //     };
    //     if (doc.type == 'removed') {
    //     };
    //   });
    // });

    query.get()
      .then((docs) => {

        docs.forEach((doc) => {
          this.posts.push(doc);
        });

        loader.dismiss();

        this.current = this.posts[this.posts.length - 1];
      }).catch((err) => {
        console.log(err);
      });
    return this.posts;
  }

  loadMorePosts(event): Post[] {
    firebase.firestore().collection("posts")
      .orderBy('created', 'desc')
      .startAfter(this.current)
      .limit(this.pageSize)
      .get()
      .then((docs) => {

        docs.forEach((doc) => {
          this.posts.push(doc);
        });

        if (docs.size < this.pageSize) {
          //all docs have been loaded
          event.enable(false);
          this.infiniteEvent = event;
        } else {
          event.complete();
          this.current = this.posts[this.posts.length - 1];
        }
      }).catch((err) => {
        console.log(err);
      });
    return this.posts;
  }

  refreshPosts(event) {
    this.posts = [];
    this.getPosts();
    if (this.infiniteEvent) {
      this.infiniteEvent.enable(true);
    }
    event.complete();
  }

}

import { Injectable } from '@angular/core';

import { NotificationProvider } from './../notification/notification';

import firebase from 'firebase';

@Injectable()
export class AuthProvider {

  constructor(public toast: NotificationProvider) {

  }

  signup(email: string, password: string, username: string, handler: any) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((data) => {

        let newUser: firebase.User = data.user;
        newUser.updateProfile({
          displayName: username,
          photoURL: ''
        }).then(() => {
          this.toast.createAlert('Account created', `You have registered successfully, ${data.user.displayName}`, handler);
        });
        console.log('data: ', data);
      }).then(() => {
        console.log('profile updated.');
      }).catch((err) => {
        this.toast.errorToast('There was an error while registering. Error: ' + err.message);
        console.log('error: ', err);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  signin(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((data) => {
        this.toast.successToast('Welcome ' + data.user.displayName);
        console.log(data);
      })
      .catch((err) => {
        this.toast.errorToast('There was an error while registering. Error: ' + err.message);
        console.log(err);
      })
  }


}
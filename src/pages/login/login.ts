import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

import { FeedPage } from './../feed/feed';
import { SignupPage } from './../signup/signup';

import { User } from '../../models/user';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  appUser: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider
  ) {
    this.appUser= {
      $key:'',
      username:'',
      email:'c@c.com',
      password:'123456'
    }
  }

  goToSignup() {
    this.navCtrl.push(SignupPage);
  }

  login(){
    this.auth.signin(this.appUser.email, this.appUser.password);
    this.navCtrl.setRoot(FeedPage);
  }


}

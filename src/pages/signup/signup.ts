import { FeedPage } from './../feed/feed';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { User } from '../../models/user';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  appUser: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider
  ) {
    this.appUser= {
      $key:'',
      username:'',
      email:'',
      password:''
    }
  }

  goToLogin() {
    this.navCtrl.setRoot(LoginPage);
  }

  register() {
    console.log('registering....')
    this.auth.signup(this.appUser.email,this.appUser.password,this.appUser.username,this.onHandler);
  }

  private onHandler = ()=>{
    this.navCtrl.setRoot(FeedPage);
 }

}

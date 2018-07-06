import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import firebase from 'firebase/app';

import { config } from '../config/config';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from './../pages/signup/signup';
import { FeedPage } from './../pages/feed/feed';
import { AuthProvider } from '../providers/auth/auth';
import { NotificationProvider } from '../providers/notification/notification';
import { PostsProvider } from '../providers/posts/posts';
import { LocaleProvider } from '../providers/locale/locale';

firebase.initializeApp(config.firebase);
firebase.firestore().settings({
  timestampsInSnapshots: true
});

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    FeedPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    FeedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    NotificationProvider,
    PostsProvider,
    LocaleProvider
  ]
})
export class AppModule { }

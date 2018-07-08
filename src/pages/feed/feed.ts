import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Post } from './../../models/post';
import { LoginPage } from './../login/login';
import { AuthProvider } from './../../providers/auth/auth';
import { LocaleProvider } from './../../providers/locale/locale';
import { PostsProvider } from './../../providers/posts/posts';

import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  post: Post;
  posts: Post[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider,
    private postsProvider: PostsProvider,
    private locale: LocaleProvider,
    private camera: Camera) {

    this.post = {
      $key: '',
      text: '',
      ownerId: '',
      ownerName: '',
      created: ''
    }
    this.getAllPosts();
  }

  getAllPosts() {
    this.posts = [];
    this.posts = this.postsProvider.getPosts();
  }

  loadMorePosts(event) {
    //this.posts = [];
    this.postsProvider.loadMorePosts(event);
  }

  makePost() {
    this.postsProvider.createPost(this.post.text);
    this.post.text = '';
    this.getAllPosts();
  }

  refresh(event) {
    this.postsProvider.refreshPosts(event);
  }

  countTimeAgo(time: any) {
    return this.locale.ago(time);
  }

  addPhoto() {
    this.launchCamera();
  }

  private launchCamera(){
    let options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      targetWidth: 512,
      targetHeight: 512,
      allowEdit: true
    }

    this.camera.getPicture(options)
      .then((base64Image) => {
        console.log(base64Image);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  logout() {
    this.navCtrl.setRoot(LoginPage)
    this.auth.signout();
  }

}

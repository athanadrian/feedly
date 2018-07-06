import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Post } from './../../models/post';
import { LoginPage } from './../login/login';
import { AuthProvider } from './../../providers/auth/auth';
import { LocaleProvider } from './../../providers/locale/locale';
import { PostsProvider } from './../../providers/posts/posts';

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
    private locale: LocaleProvider) {

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

  logout() {
    this.navCtrl.setRoot(LoginPage)
    this.auth.signout();
  }

}

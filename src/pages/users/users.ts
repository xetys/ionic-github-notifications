import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GithubUsers} from "../../providers/github-users";
import {User} from "./user.module";

/**
 * Generated class for the Users page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class Users implements OnInit {

  users: User[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public githubUsers: GithubUsers
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Users');
  }

  ngOnInit(): void {
    this.githubUsers.load()
      .subscribe(users => this.users = users);
  }
}

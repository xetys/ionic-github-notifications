import { Component } from '@angular/core';

import {GithubNotifications} from "../../providers/github-notifications";
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Settings page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class Settings {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public gitHubNotifications: GithubNotifications
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Settings');
  }

  wipeStorage() {
    this.gitHubNotifications.wipeStorage().then(() => {
      this.gitHubNotifications.syncNotifications();
    });
  }

  resync() {
    this.gitHubNotifications.syncNotifications(); 
  }
}

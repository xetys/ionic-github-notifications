import {NavController, NavParams} from "ionic-angular";
import {Component} from "@angular/core";
import {GithubNotifications} from "../../providers/github-notifications";
import {Thread} from "./notification.model";
import {Notifications} from "./notifications";
import marked from 'marked';
/**
 * Created by david on 16.04.17.
 */


@Component({
  templateUrl: 'notification-details.component.html'
})
export class NotificationDetails {
  thread: Thread;
  openTab = 'thread';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public gitHubNotifications: GithubNotifications) {
    this.thread = gitHubNotifications.loadedThread;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Notifications');
  }

  back() {
    this.navCtrl.setRoot(Notifications);
  }

  marked(text: string) {
    return marked(text);
  }
}

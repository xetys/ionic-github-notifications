import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {GithubAuth} from "../../providers/github-auth";
import {Notifications} from "../notifications/notifications";

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  userName: string;
  password: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastController: ToastController,
    public loadingCtrl: LoadingController,
    public gitHubAuth: GithubAuth
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
    let loader = this.loadingCtrl.create({
      content: "Please wait"
    });

    loader.present();
    setTimeout(() => {
      this.gitHubAuth.checkAuth().subscribe(isAuthenticated => {
        loader.dismissAll();
        if (isAuthenticated) {
          this.onLoggedIn();
        }
      });
    }, 499);
  }

  login() {
    this.gitHubAuth.login(this.userName, this.password)
      .subscribe(isAuthenticated => {
        if (isAuthenticated) {
          this.onLoggedIn();
        } else {
          this.onError('Bad Login');
        }
      },
        () => {
          this.onError('Bad Login');

        });
  }

  logout() {
    this.gitHubAuth.logout();
  }

  onLoggedIn() {
    this.toastController.create({
      message: 'login succeeded',
      position: 'bottom',
      duration: 3000
    }).present();
    this.navCtrl.setRoot(Notifications);
  }

  onError(errorMessage: string) {
    console.log('login error', errorMessage);
    this.toastController.create({
      message: 'login failed!',
      position: 'bottom',
      duration: 3000
    }).present();
  }

}

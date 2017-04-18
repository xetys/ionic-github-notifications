import { TestService } from './../../providers/test-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Test page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class Test {
  numbers: number[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public testService: TestService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Test');

    this.testService.randomNumberStream()
      .subscribe(num => this.numbers.push(num));
  }

}

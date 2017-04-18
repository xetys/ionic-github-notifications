import { NgModule } from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import { Notifications } from './notifications';
import {NotificationDetails} from "./notification-details.component";

@NgModule({
  declarations: [
    Notifications,
    NotificationDetails
  ],
  imports: [
    IonicPageModule.forChild(Notifications),
  ],
  exports: [
    Notifications,
    NotificationDetails
  ]
})
export class NotificationsModule {}

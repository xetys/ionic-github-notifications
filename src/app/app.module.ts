import { SettingsModule } from './../pages/settings/settings.module';
import { TestService } from './../providers/test-service';
import { TestModule } from './../pages/test/test.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
//import { ItemDetailsPage } from '../pages/item-details/item-details';
//import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Users} from "../pages/users/users";
import {UsersModule} from "../pages/users/users.module";
import {GithubUsers} from "../providers/github-users";
import {HttpModule} from "@angular/http";
import {Login} from "../pages/login/login";
import {LoginModule} from "../pages/login/login.module";
import {IonicStorageModule} from "@ionic/storage";
import {GithubAuth} from "../providers/github-auth";
import {NotificationsModule} from "../pages/notifications/notifications.module";
import {Notifications} from "../pages/notifications/notifications";
import {GithubNotifications} from "../providers/github-notifications";
import {NotificationDetails} from "../pages/notifications/notification-details.component";
import {Test} from "../pages/test/test";
import {Settings} from "../pages/settings/settings";

@NgModule({
  declarations: [
    MyApp

  ],
  imports: [
    BrowserModule,
    UsersModule,
    LoginModule,
    NotificationsModule,
    TestModule,
    HttpModule,
    SettingsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Test,
    Users,
    Login,
    Notifications,
    NotificationDetails,
    Settings
  ],

  providers: [
    StatusBar,
    SplashScreen,
    GithubUsers,
    GithubAuth,
    GithubNotifications,
    TestService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

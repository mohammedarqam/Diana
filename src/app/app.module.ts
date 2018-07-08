import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';

firebase.initializeApp({
  apiKey: "AIzaSyA7bn46-7NyCztVM7RPg2OVfkV75udiCqA",
  authDomain: "cafediana-codebro.firebaseapp.com",
  databaseURL: "https://cafediana-codebro.firebaseio.com",
  projectId: "cafediana-codebro",
  storageBucket: "cafediana-codebro.appspot.com",
  messagingSenderId: "1040616558486"
});

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocationTrackerProvider
  ]
})
export class AppModule {}

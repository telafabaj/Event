import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { firebaseConfig } from './credentials';
import firebase from 'firebase';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    firebase.initializeApp(firebaseConfig); //usando FirebaseSDK

    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) { // usuario autenticado
        if (!user.emailVerified) {
          console.log('Usuario ainda nao validado.');
          this.rootPage = 'LoginPage'; // correto seria direcionar pra uma página com informações para validar email
          unsubscribe();
        } else {
          this.rootPage = HomePage;
          unsubscribe();
        }
      } else {
        this.rootPage = 'LoginPage';
        unsubscribe();
      }
    });  // create autentica listner
    
  }
}


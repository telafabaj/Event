import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public authProvider: AuthProvider) {

  }

  goToProfile(): void {
    this.navCtrl.push("ProfilePage");
  }

  logoutUser(): void {
    this.authProvider.logoutUser().then(user => {
      this.navCtrl.setRoot('LoginPage');
    });
  }

}
import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    public authProvider: AuthProvider) {

    this.signupForm = formBuilder.group({
      email: ['',
        Validators.compose([Validators.required, Validators.email])],
      password: ['',
        Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signupUser(): void {
    if (!this.signupForm.valid) {
      console.log(`Need to complete the form, current value: ${this.signupForm.value}`);
    } else {
      const email: string = this.signupForm.value.email;
      const password: string = this.signupForm.value.password;

      this.authProvider.signupUser(email, password).then(user => {
        this.navCtrl.setRoot(HomePage);
      },
        error => {
          const alert = this.alertController.create({
            message: error.message,
            buttons: [{ text: "Ok", role: "cancel" }]
          });
          alert.present();
        });
    }
  }

}

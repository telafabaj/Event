import { Component } from '@angular/core';
import { AlertController, IonicPage, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm: FormGroup;
  public loading: Loading;

  constructor(public loadingController: LoadingController, 
              public alertController: AlertController, 
              public authProvider: AuthProvider, 
              public formBuilder: FormBuilder,
              public navCtrl: NavController, 
              public navParams: NavParams) {

    this.loginForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, Validators.email])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  goToSignup(): void {
      this.navCtrl.push('SignupPage');
  }

  goToResetPassword(): void {
    this.navCtrl.push('ResetPasswordPage');
  }

  loginUser(): void {
    if (!this.loginForm.valid) {
      console.log(`Form is not valid yet, current value: ${this.loginForm.valid}`);
    } else {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.authProvider.loginUser(email, password).then(authdata => {
        this.loading.dismiss();/*.then(() => {
          this.navCtrl.setRoot(HomePage); //!******
        });*/
      }, error => {
        this.loading.dismiss().then(() => {
          let alert = this.alertController.create({
            message: error.message,
            buttons: [{ text: 'OK', role: 'cancel'}]
          });
          alert.present();
        });
      });
    this.loading = this.loadingController.create();
    this.loading.present();
   }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}

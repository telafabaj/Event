import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, Alert } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  public resetPasswordForm: FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertController: AlertController,
              public formBuilder: FormBuilder,
              public authProvider: AuthProvider) {

    //criando os validadores para o form de reset do password
    this.resetPasswordForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, Validators.email])
      ]
    });
  }

  resetPassword(): void {
    if (!this.resetPasswordForm.valid) {
      console.log(`Form is not valid yet, current value: ${this.resetPasswordForm.value}`);
    } else {
      
      const email: string = this.resetPasswordForm.value.email;
      
      this.authProvider.resetPassword(email).then(user => {
        const alert: Alert = this.alertController.create({
          message: 'Check your email for a password reset link',
          buttons: [{
            text: "Ok", role: "cancel", handler: () => {
              this.navCtrl.pop(); // destroy a tela do reset password e volta pro login
            } 
          }]
        });
        alert.present();
      }, error => {
        const errorAlert = this.alertController.create({
          message: error.message,
          buttons: [{ text: "Ok", role: "cancel" }]
        });
        errorAlert.present();
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

}

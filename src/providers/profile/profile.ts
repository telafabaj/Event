import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { User, AuthCredential } from '@firebase/auth-types';
import { Reference } from '@firebase/database-types';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {
  public userProfile: Reference;
  public currentUser: User;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`);
      }

    });
    console.log('Hello ProfileProvider Provider');
  }

  getUserProfile() {
    return this.userProfile;
  }

  updateName(firstName: string, lastName: string): Promise<any> {
    // We’re using .update() here because we only want to update the firstName and lastName properties, if we were to use .set() to write to the database, it would delete everything under the user’s profile and replace it with the first and last name.
    return this.userProfile.update({ firstName, lastName });
  }

  updateDOB(birthDate: string): Promise<any> {
    return this.userProfile.update({ birthDate });
  }

  updateEmail(newEmail: string, password: string): Promise<any> {
    //buscando as credenciais atuais do usuário
    const credential: AuthCredential = firebase.auth.EmailAuthProvider.credential(this.currentUser.email, password);

    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(user => {
        this.currentUser.updateEmail(newEmail).then(user => {
          this.userProfile.update({ email: newEmail });
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  updatePassword(newPassword: string, oldPassword: string): Promise<any> {
    const credential: AuthCredential = firebase.auth.EmailAuthProvider.credential(this.currentUser.email, oldPassword);

    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(user => {
        this.currentUser.updatePassword(newPassword).then(user => {
          console.log('Password changed');
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

}

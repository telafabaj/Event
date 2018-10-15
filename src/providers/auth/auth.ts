import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }

  //funcao de login do usuario
  loginUser(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  //funcao para criar novo usuario
  signupUser(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password) //salvando os dados de autenticacao do usuario no modulo local
        .then(newUser => { //grava o novo usuário na base do firebase
          firebase
            .database()
            .ref(`/userProfile/${newUser.uid}/email`) //criando novo nó chamado email dentro do nó userProfil/id na base de dados
            .set(email); //adicionando o email do usuario ao novo nó. A senha não salvo.

          firebase.auth().currentUser.sendEmailVerification().then(() => {
            console.log('Email de verificação enviado.');
          });
        })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  resetPassword(email: string): Promise<void> {
    return firebase
      .auth()
      .sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    const userId: string = firebase.auth().currentUser.uid;
    
    // There’s one thing people struggle with when logging out, sometimes the app is still listening to the database references, and it creates errors when your security rules are set up, for that, we need to turn the reference off before logging out
    firebase
      .database()
      .ref(`/userProfile/${userId}`)
      .off();

    return firebase
      .auth()
      .signOut();
  }

}

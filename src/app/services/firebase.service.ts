import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interface/user';
import { ToastService } from './toast.service';
import { LoadingController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor( private auth: AngularFireAuth,
               private toast: ToastService,
               private db: AngularFirestore,
               private router: Router,
               private loading: LoadingController ) {

  }

  getUser( uid: string ) {
    return this.db.collection('users').doc<User>(uid).valueChanges();
  }

  logOut() {
    return this.auth.auth.signOut();
  }

  updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.uid}`);
    const data = {
      userName: user.userName,
      email: user.email,
      uid: user.uid
    };
    return userRef.set(data, { merge: true });
  }

  async login(user: User) {
    const loading = await this.loading.create({
      message: 'Logging in...'
    });
    await loading.present();

    return new Promise((resolve, reject) => {

      this.auth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(data => {
        const uid = data.user.uid;
        const get = this.getUser(uid).subscribe((resp) => {
          loading.dismiss();
          this.toast.toastMessage('Welcome ' + resp.userName);
          this.router.navigate(['/home/' + resp.uid]);
          get.unsubscribe();
        });
      }).catch((err) => {
        if (err.code === 'auth/wrong-password') {
          this.toast.toastFailure('The password is invalid or the user does not have a password.');
        } else if (err.code === 'auth/user-not-found') {
          this.toast.toastFailure('There is no user record corresponding to this identifier. The user may have been deleted.');
        } else if (err.code === 'auth/network-request-failed') {
          this.toast.toastFailure('A network error (such as timeout, interrupted connection or unreachable host) has occurred.');
        } else {
          this.toast.toastFailure('Has ocurred an error. Try again later.');
          console.log(err);
        }
        loading.dismiss();
      });
    }).catch((err) => {
      console.log(err);
      loading.dismiss();
    });
  }

  async register(user: User) {
    const loading = await this.loading.create({
      message: 'Creating Account...'
    });
    await loading.present();
    return new Promise((resolve, reject) => {
      this.auth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(data => {
        user.uid = data.user.uid;
        return this.updateUserData(user).then(() => {
          loading.dismiss();
          this.toast.toastMessage('Welcome ' + user.userName);
          this.router.navigate(['/home/' + user.uid]);
        }).catch((err) => {
          loading.dismiss();
          this.toast.toastFailure('Has ocurred an error. Try again later.');
        });
      }).catch((err) => {
        if (err.code === 'auth/weak-password') {
          this.toast.toastFailure('Too Weak Password.');
        } else if (err.code === 'auth/email-already-in-use') {
          this.toast.toastFailure('Email Already Exists');
        } else if (err.code === 'auth/invalid-email') {
          this.toast.toastFailure('Invalid Email.');
        } else if (err.code === 'auth/network-request-failed') {
          this.toast.toastFailure('A network error (such as timeout, interrupted connection or unreachable host) has occurred.');
        } else {
          this.toast.toastFailure('Has ocurred an error. Try again later.');
          console.log(err);
        }
        loading.dismiss();
      });
    }).catch((err) => {
      console.log(err);
      loading.dismiss();
    });
  }
}

import { Router } from  "@angular/router";
import { Injectable } from '@angular/core';

import { User } from  'firebase';
import { AngularFireAuth } from  "@angular/fire/auth";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  constructor(
    public afAuth:  AngularFireAuth, 
    public router:  Router,
    private _snackBar: MatSnackBar
  ) { 
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })

    if (this.isLoggedIn) {
      this.router.navigate(['userList']);
    }
  }

  async signUp(email: string, password: string) {
    try {
      await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      this.login(email, password)
    } catch (e) {
      this._snackBar.open("Houve um erro no cadastro do usuário", "Ok", { duration: 2500 });
    }
  }

  async login(email: string, password: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password)
      this.router.navigate(['userList']);
    } catch (e) {
      this._snackBar.open("Usuário não autenticado", "Ok", { duration: 2500 });
    }
  }
  
  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }
}

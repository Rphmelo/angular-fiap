import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from  '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.css']
})
export class RegisterPage {

  loading: boolean = false;

  toggleButton = true;
  
  registerForm = new FormGroup({
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    email: new FormControl('')
  });

  constructor( private authService:  AuthService, private _snackBar: MatSnackBar ) { }

  ngOnInit() {}

  toggleTypeForm() {
    this.toggleButton = !this.toggleButton
  }

  onSubmit() {
    this.loading = true;
    if (this.toggleButton) {
      this.authService.login(this.registerForm.value.email, this.registerForm.value.password)
      .then(() => this.loading = false ).catch(() => this.loading = false);
    } else if (this.registerForm.value.confirmPassword == this.registerForm.value.password) {
      this.authService.signUp(this.registerForm.value.email, this.registerForm.value.password)
      .then(() => {
        this.loading = false;
        this._snackBar.open("Cadastro feito com sucesso", "Ok", { duration: 2500 });
      }).catch(() => {
        this.loading = false
      });
    } else {
      this.loading = false
      this._snackBar.open("Digite a mesma senha nos dois campos", "Ok", { duration: 2500 });
    }
  }

}

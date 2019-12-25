import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    public authService: AuthenticationService
  ) {
    this.loginForm = _fb.group({
      email: ['' , [Validators.required , Validators.email]],
      password: ['' , Validators.required]
    });
  }

  ngOnInit() {
    this.authService.loginError = null;
  }

  login() {
    for (const control in this.loginForm.controls) {
      if (this.loginForm.controls[control]) {
        this.loginForm.controls[control].markAsDirty();
        this.loginForm.controls[control].updateValueAndValidity();
      }
    }
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value);
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}

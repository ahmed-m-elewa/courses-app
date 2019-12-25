import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    public authService: AuthenticationService
  ) {
    this.registrationForm = _fb.group({
      userName: ['', [
        Validators.required,
        Validators.pattern('[a-zA-Z._\' ]*'),
        Validators.minLength(5),
        Validators.maxLength(25)
      ]],
      firstName: ['', [
        Validators.required,
        Validators.pattern('[a-zA-Zأ-يءﻻ.\' ]*'),
        Validators.minLength(3),
        Validators.maxLength(25)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.pattern('[a-zA-Zأ-يءﻻ.\' ]*'),
        Validators.minLength(3),
        Validators.maxLength(25)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(7),
        Validators.pattern(/(?=.*\d)(?=.*[a-zA-Z])/),
        this.passwordsValidator
      ]],
      confirmPassword: ['', [
        Validators.required,
        this.passwordsValidator
      ]
      ]
    });
  }

  ngOnInit() {
    this.authService.loginError = null;
  }

  passwordsValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (this.password.value !== this.confirmPassword.value) {
      return {'equalPasswords': true};
    } else {
      return null;
    }
  };

  register() {
    for (const control in this.registrationForm.controls) {
      if (this.registrationForm.controls[control]) {
        this.registrationForm.controls[control].markAsDirty();
        this.registrationForm.controls[control].updateValueAndValidity();
      }
    }
    if (this.registrationForm.valid) {
      this.authService.createNewUser(this.registrationForm.value);
    }
  }

  get userName() {
    return this.registrationForm.get('userName');
  }

  get firstName() {
    return this.registrationForm.get('firstName');
  }

  get lastName() {
    return this.registrationForm.get('lastName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }

}

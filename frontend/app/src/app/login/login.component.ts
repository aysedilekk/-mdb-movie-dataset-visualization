import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

import { AuthService } from '../service/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;

  username = new FormControl('', Validators.compose([
    Validators.required,
    Validators.minLength(3),
    Validators.pattern('^[a-zA-Z0-9]+$')
  ]));

  password = new FormControl('', Validators.compose([
    Validators.required,
  ]));

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signinForm = this.fb.group({
      username: this.username,
      password: this.password
    })
  }

  ngOnInit() {}

  loginUser() {
    this.authService.signIn(this.signinForm.value)
  }
}

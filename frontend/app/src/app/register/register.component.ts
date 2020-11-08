import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

import { AuthService } from '../service/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup;

  username = new FormControl('', Validators.compose([
    Validators.required,
    Validators.minLength(3),
    Validators.pattern('^[a-zA-Z0-9]+$')
  ]));

  email = new FormControl('', Validators.compose([
    Validators.required,
    Validators.email,
  ]));

  password = new FormControl('', Validators.compose([
    Validators.required,
  ]));

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signupForm = this.fb.group({
      username: this.username,
      email: this.email,
      password: this.password
    })
  }

  ngOnInit() {}

  registerUser() {
    console.log(this.signupForm.value)
    this.authService.signUp(this.signupForm.value).subscribe((res) => {
      console.log(res)
      if (res) {
        this.signupForm.reset()
        this.router.navigate(['/']);
      }
    })
  }

}

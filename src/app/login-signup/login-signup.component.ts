import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl } from '@angular/forms/src/model';
@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css'],
})
export class LoginSignupComponent implements OnInit {

  loginForm: FormGroup;
  signupForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { 
    this.loginForm = formBuilder.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  ngOnInit() {
  }

}

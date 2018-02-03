import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms/src/model';

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
      'password': ['', Validators.required]
    });
    this.signupForm = formBuilder.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'username': ['', Validators.required],
      'age': ['', [Validators.pattern('^[0-9]+$'), Validators.required]],
      'gender': ['', Validators.required],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'repassword': ['', [Validators.required, this.repasswordValidator]],
    });
  }

  ngOnInit() {
  }

  onLogin(): void {
    console.log(this.loginForm.value);
    return;
  }

  onSignup(): void{
    console.log(this.signupForm.value);
    return;
  }

  repasswordValidator(control: FormControl): {[s: string]: boolean} {
    if(control.value != control.root.value['password']){
      return {'invalid': true};
    }
    return null;
  }
}

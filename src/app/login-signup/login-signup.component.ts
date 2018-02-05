import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms/src/model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css'],
})
export class LoginSignupComponent implements OnInit {

  loginForm: FormGroup;
  signupForm: FormGroup;
  location: [any];
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {            
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
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.location = [position.coords.longitude, position.coords.latitude];
      });
    }
  }

  ngOnInit() {
    if(!this.location){
      this.location = [0.0, 0.0];
    }
  }

  onLogin(): void {
    let user = this.loginForm.value;
    user.location = this.location;
    this.authService.login(user).subscribe(result => {
      console.log(result);
      switch(result['status']){
        case 'success':
          localStorage.setItem('token', result.data.token);
          this.router.navigate(['home']);
          break;
        case 'failed':
          this.loginForm.controls['password'].setErrors({ emailOrPassword: true });
          break;
        default:
          console.log('error');
      }
    });
    return;
  }

  onSignup(): void{
    let user = this.signupForm.value;
    user.location = this.location;
    this.authService.createUser(user).subscribe(data => {
      console.log(data);
      switch(data['status']) {
        case 'success':
          user = { email: user.email, password: user.password };
          user.location = this.location;
          this.authService.login(user).subscribe(result => {
            switch(result['status']){
              case 'success':
                localStorage.setItem('token', result.data.token);
                this.router.navigate(['home']);
                break;
              case 'failed':
                this.loginForm.controls['password'].setErrors({ emailOrPassword: true });
                break;
              default:
                console.log('error');
            }
          });
          break;
        case 'failed':  
          this.signupForm.controls['email'].setErrors({ duplicate: true });
          break;
        default:
          console.log('error');
      }
    });
    return;
  }

  repasswordValidator(control: FormControl): {[s: string]: boolean} {
    if(control.value != control.root.value['password']){
      return {'invalid': true};
    }
    return null;
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms/src/model';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css'],
})
export class LoginSignupComponent implements OnInit {

  loginForm: FormGroup;
  signupForm: FormGroup;
  location: any;
  constructor(private formBuilder: FormBuilder, private httpService: HttpService) { 
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
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.location = position.coords;
      });
   }
  }

  onLogin(): void {
    console.log(this.loginForm.value);
    return;
  }

  onSignup(): void{
    let user = this.signupForm.value;
    user.location = [this.location.longitude, this.location.latitude];
    this.httpService.createUser(user).subscribe(data => {
      console.log(data);
      switch(data['status']) {
        case 200:
          console.log('success')
          break;
        case 500:  
          this.signupForm.controls['email'].setErrors({ duplicate: true })
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

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms/src/model';
import { MatDialogRef } from '@angular/material';
import { AuthService } from '../auth.service';
import { ActionService } from '../action.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  constructor(private formBuilder: FormBuilder, 
              private authService: AuthService,
              private dialogRef: MatDialogRef<ProfileComponent>,
              private actionService: ActionService) {
              
    this.profileForm = formBuilder.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'username': ['', Validators.required],
      'age': ['', [Validators.pattern('^[0-9]+$'), Validators.required]],
      'gender': ['', Validators.required],
      'password': [''],
    });       
    let user = this.authService.parseToken();
    this.profileForm.setValue({
      email: user['email'],
      username: user['username'],
      age: user['age'],
      gender: user['gender'],
      password: '',
    });     
  }

  ngOnInit() {
    
  }

  onSubmit(): void {
    this.authService.updateUser(this.profileForm.value).subscribe(data => {
      switch(data.status){
        case 'success':
          console.log(data);
          localStorage.setItem('token', data.data.token);
          // REDUX
          this.actionService.updateUserGlobally();
          this.dialogRef.close();
          break;
        case 'failed':
          this.profileForm.controls['email'].setErrors({ duplicate: true });
          break;
        default: 
          console.log('error');
      }
    });
  }
}

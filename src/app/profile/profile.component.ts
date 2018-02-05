import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms/src/model';
import { MatDialogRef } from '@angular/material';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  user: {any};
  constructor(private formBuilder: FormBuilder, 
              private authService: AuthService,
              private dialogRef: MatDialogRef<ProfileComponent>) {
              
    this.profileForm = formBuilder.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'username': ['', Validators.required],
      'age': ['', [Validators.pattern('^[0-9]+$'), Validators.required]],
      'gender': ['', Validators.required],
      'password': [''],
    });       
    this.user = this.authService.parseToken();
    this.profileForm.setValue({
      email: this.user['email'],
      username: this.user['username'],
      age: this.user['age'],
      gender: this.user['gender'],
      password: '',
    });     
  }

  ngOnInit() {
  }

  onSubmit(): void {
    this.authService.updateUser(this.profileForm.value).subscribe(data => {
      switch(data.status){
        case 'success':
          localStorage.setItem('token', data.data.token);
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

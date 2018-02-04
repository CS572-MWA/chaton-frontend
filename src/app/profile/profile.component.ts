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
  constructor(private formBuilder: FormBuilder, 
              private authService: AuthService,
              private dialogRef: MatDialogRef<ProfileComponent>) {
              
    this.profileForm = formBuilder.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'username': ['', Validators.required],
      'age': ['', [Validators.pattern('^[0-9]+$'), Validators.required]],
      'gender': ['', Validators.required],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });            
  }

  ngOnInit() {
  }

  onSubmit(): void {
    
  }
}

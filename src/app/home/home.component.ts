import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RoomComponent } from './../room/room.component';
import { ProfileComponent } from './../profile/profile.component';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms/src/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  messageForm: FormGroup;
  constructor(private dialog: MatDialog, 
              private authService: AuthService,
              private formBuilder: FormBuilder) { 
    this.messageForm = formBuilder.group({
      'message': ['', Validators.required],
    })            
  }

  ngOnInit() {
  }

  onSubmit(): void {
    console.log(1234);
  }

  openRoomDialog(): void{
    let dialogRef = this.dialog.open(RoomComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openProfileDialog(): void{
    let dialogRef = this.dialog.open(ProfileComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  logout(): void{
    this.authService.logout();
  }
}

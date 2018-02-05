import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RoomComponent } from './../room/room.component';
import { ProfileComponent } from './../profile/profile.component';
import { AddUserComponent } from './../add-user/add-user.component';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms/src/model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  messageForm: FormGroup;
  user: {any};
  groups: [any];
  constructor(private dialog: MatDialog, 
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) { 
    this.messageForm = formBuilder.group({
      'message': ['', Validators.required],
    });
    this.user = this.authService.parseToken();
    this.authService.groups().subscribe(data => {
      switch(data.status){
        case 'success':
          this.groups = data.data;
          break;
        case 'failed':
          console.log(data)
          break;
        default:
          console.log('error');    
      }
    });            
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

  openAddUserDialog(group_id): void {
    let dialogRef = this.dialog.open(AddUserComponent, {
      width: '500px',
    });

    dialogRef.componentInstance.group_id = group_id;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  removeUserFromGroup(group_id, user_id): void {
    if(window.confirm('Are you sure to remove this user?')){
      this.authService.removeUserFromGroup({ id: group_id, user_id: user_id }).subscribe(data => {
        switch(data.status){
          case 'success':
            console.log(data);
            break;
          case 'failed':
            console.log(data)
            break;
          default:
            console.log('error');    
        }
      });
    }
  }

  logout(): void{
    this.authService.logout();
    this.router.navigate(['login']);
  }
}

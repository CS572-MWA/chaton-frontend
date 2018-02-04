import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms/src/model';
import { MatDialogRef } from '@angular/material';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  roomForm: FormGroup;
  constructor(private formBuilder: FormBuilder, 
              private authHttp: AuthService,
              private dialogRef: MatDialogRef<RoomComponent>) { 
    this.roomForm = formBuilder.group({
      'name': ['', Validators.required],
    })
  }

  ngOnInit() {
  }

  onSubmit(): void {
    let group = this.roomForm.value;
    group.users = ['5a763c66cc38db200f43d02c'];
    this.authHttp.createGroup(group).subscribe(data => {
      switch(data['status']) {
        case 'success':
          this.dialogRef.close();
          break;
        case 'failed':  
          console.log('failed');
          break
        default:
          console.log('error');
      }
    });
  }

}

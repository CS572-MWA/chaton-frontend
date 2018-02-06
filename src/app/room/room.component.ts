import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms/src/model';
import { MatDialogRef } from '@angular/material';
import { AuthService } from '../auth.service';
import { ActionService } from '../action.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  roomForm: FormGroup;
  user: {any};
  constructor(private formBuilder: FormBuilder, 
              private authHttp: AuthService,
              private actionService: ActionService,
              private chatService: ChatService,
              private dialogRef: MatDialogRef<RoomComponent>) { 
    this.roomForm = formBuilder.group({
      'name': ['', Validators.required],
    });
    this.user = this.authHttp.parseToken();
  }

  ngOnInit() {
  }

  onSubmit(): void {
    let group = this.roomForm.value;
    group.users = [this.user['id']];
    this.authHttp.createGroup(group).subscribe(data => {
      switch(data['status']) {
        case 'success':
          this.chatService.enterGroup({
            id: data.data._id, // groupID
            groups: [data.data]
          });
          this.dialogRef.close();
          break;
        case 'failed':  
          console.log(data);
          break
        default:
          console.log('error');
      }
    });
  }

}

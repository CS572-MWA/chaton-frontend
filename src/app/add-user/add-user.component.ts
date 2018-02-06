import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AuthService } from '../auth.service';
import { ActionService } from '../action.service';
import { ChatService } from '../chat.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  group_id: string;
  userForm: FormGroup;
  users: [any];
  formCtrl: FormControl;
  constructor(private formBuilder: FormBuilder, 
              private authService: AuthService,
              private actionServie: ActionService,
              private chatService: ChatService,
              private dialogRef: MatDialogRef<AddUserComponent>) { 
    
    this.userForm = formBuilder.group({
      'data': ['', Validators.required],
    });

    this.authService.users().subscribe(data => {
      switch(data.status){
        case 'success':
          this.users = data.data;
          break;
        case 'failed':
          console.log(data);
          break;
        default:
          console.log('error'); 
      }
    });
    
  }

  ngOnInit() {
    this.group_id = this.dialogRef.componentInstance.group_id;
  }

  onSubmit(): void {
    if(this.userForm.value.data){
      let user_id = this.userForm.value.data['_id'];
      this.authService.addUserToGroup({ id: this.group_id, user_id: user_id }).subscribe(data=>{
        switch(data.status){
          case 'success':
            this.chatService.enterGroup({
              id: this.group_id,
              groups: [data.data]
            });
            this.dialogRef.close();
            break;
          case 'failed':
            console.log(data);
            break;
          default:
            console.log('error'); 
        }
      });
    }
  }

  displayFn(user) {
    return user.username;
  }
}

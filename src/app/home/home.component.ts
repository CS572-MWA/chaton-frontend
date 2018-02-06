import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTabChangeEvent } from '@angular/material';
import { RoomComponent } from './../room/room.component';
import { ProfileComponent } from './../profile/profile.component';
import { AddUserComponent } from './../add-user/add-user.component';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms/src/model';
import { Router } from '@angular/router';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { IUser } from './../redux-store/user';
import { IGroup } from './../redux-store/group';
import { ActionService } from '../action.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  messageForm: FormGroup;
  @select('user') user$: Observable<IUser>;
  @select('groups') groups$: Observable<IGroup>;
  activeGroup: any;
  user: {};
  groupMessages: any = {};
  messages: any = [];
  constructor(private dialog: MatDialog, 
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private chatService: ChatService,
              private actionService: ActionService) { 
    this.messageForm = formBuilder.group({
      'message': ['', Validators.required],
    });
    // REDUX
    this.actionService.updateUser();
    this.user$.subscribe(data => {
      this.user = data;
    });
    this.authService.groups().subscribe(data => {
      switch(data.status){
        case 'success':
          this.actionService.addGroup(data.data);
          for(let g of data.data){
            this.groupMessages[g._id] = {
              users: g.users,
              messages: [],
            }
          }
          this.chatService.enterGroups(data.data);
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

    // LISTEN SENT MESSAGE
    this.chatService.getMessage().subscribe(data => {
      let time = new Date();
      let user = this.groupMessages[data['groupId']].users.find(u => u._id == data['userId']);
      this.groupMessages[data['groupId']].messages.push({
        user: user,
        message: data['message'],
        type: user._id == this.user['id'] ? 'self': 'other',
        time: time.getHours() + ":" + time.getMinutes(),
      });
    });

    // LISTEN REMOVED USER
    this.chatService.leaveGroupSubscribe().subscribe(data => {
      data['current_user_id'] = this.user['id'];
      this.actionService.removeUserFromGroup(data);
    });
    
    // LISTEN ENTER GROUP 
    this.chatService.enterGroupSubscribe().subscribe(data => {
      this.actionService.addGroup(data['groups']);
      for(let group of data['groups']){
        if(!this.groupMessages[group._id]){
          this.groupMessages[group._id] = {
            users: group.users,
            messages:[],
          }
        }
        else {
          for(let u of group.users){
            this.groupMessages[group._id].users.push(u);    
          }
        }
      }
      let group_ids: any = [];
      for(let id of Object.keys(this.groupMessages)){
        group_ids.push({ _id: id });
      }
      this.chatService.enterGroups(group_ids);
    });
  }

  ngOnDestroy(){
    //this.chatService.getMessage
  }

  tabChanged(event: MatTabChangeEvent) {
    this.groups$.subscribe(groups => {
      this.activeGroup = groups[event.index];
    })
  }

  onSubmit(): void {
    let message = this.messageForm.value.message;
    this.messageForm.controls['message'].setValue('');
    let time = new Date();
    this.chatService.sendMessage({
      groupId: this.activeGroup.id,
      userId: this.user['id'],
      message: message, 
    });
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
            this.chatService.leaveGroupEmit({
              id: group_id,
              user_id: user_id,
            });
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

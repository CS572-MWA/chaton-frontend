import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';

@Injectable()
export class ChatService {

  constructor(private socket: Socket) { }

  enterGroups(data){
    this.socket.emit('enter groups', data);
  }

  enterGroup(data){
    this.socket.emit('enter group', data);
  }

  enterGroupSubscribe(){
    return this.socket.fromEvent('enter group').map(data => data);
  }

  leaveGroupEmit(data){
    this.socket.emit('leave group', data);
  }

  leaveGroupSubscribe(){
    return this.socket.fromEvent('leave group').map(data => data);
  }

  sendMessage(data){
    this.socket.emit('new message', data);
  }

  getMessage() {
    return this.socket.fromEvent('refresh logs').map(data => data);
  }
}

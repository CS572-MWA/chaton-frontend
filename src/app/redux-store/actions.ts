import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from './state';

export const UPDATE_USER = 'UPDATE_USER';
export const ADD_GROUP = 'ADD_GROUP';
export const ADD_USER_TO_GROUP = 'ADD_USER_TO_GROUP';
export const REMOVE_USER_FROM_GROUP = 'REMOVE_USER_FROM_GROUP';
export const CLEAR = 'CLEAR';

@Injectable()
export class ComponentActions{

    constructor (private ngRedux: NgRedux<IAppState>){}

    updateUserAction(user: {}) {
        this.ngRedux.dispatch({
            type: UPDATE_USER,
            user: user 
        });
    }

    addGroup(group: {}) {
        this.ngRedux.dispatch({
            type: ADD_GROUP,
            group: group,
        });
    }

    addUserToGroup(group: {}){
        this.ngRedux.dispatch({
            type: ADD_USER_TO_GROUP,
            group: group,
        })
    }

    removeUserFromGroup(group: {}){
        this.ngRedux.dispatch({
            type: REMOVE_USER_FROM_GROUP,
            group: group,
        })
    }

    clear() {
        this.ngRedux.dispatch({
            type: CLEAR,
        });
    }
}
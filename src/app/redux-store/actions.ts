import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IUserState } from './state';

export const UPDATE_USER = 'UPDATE_USER';

@Injectable()
export class ComponentActions{

    constructor (private ngRedux: NgRedux<IUserState>){}

    updateUserAction(user: {}) {
        this.ngRedux.dispatch({
            type: UPDATE_USER,
            text: user 
        })
    }
}
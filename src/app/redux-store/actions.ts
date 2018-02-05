import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from './state';

export const UPDATE_USER = 'UPDATE_USER';

@Injectable()
export class ComponentActions{

    constructor (private ngRedux: NgRedux<IAppState>){}

    updateUserAction(user: {}) {
        this.ngRedux.dispatch({
            type: UPDATE_USER,
            user: user 
        })
    }
}
import { IUserState } from './state'
import { UPDATE_USER } from './actions'

const initialState: IUserState = {
    user: {
        id: '',
        username: '',
        email: '',
        age: 0,
        gender: '',
    }
}  

function updateUser(state, action): IUserState {
    return Object.assign({}, state, 
    {
        user: action.text
    });
}

export function reducer(state:IUserState = initialState, action){
    switch(action.type){
      case UPDATE_USER:
        return updateUser(state, action); 
      default:
        return state;
    }
}
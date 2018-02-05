import { IAppState } from './state'
import { UPDATE_USER } from './actions'

const initialState: IAppState = {
    user: {
        id: '',
        username: '',
        email: '',
        age: 0,
        gender: '',
    }
}  

function updateUser(state, action): IAppState {
    return Object.assign({}, state, 
    {
        user: action.user
    });
}

export function reducer(state:IAppState = initialState, action){
    switch(action.type){
      case UPDATE_USER:
        return updateUser(state, action); 
      default:
        return state;
    }
}
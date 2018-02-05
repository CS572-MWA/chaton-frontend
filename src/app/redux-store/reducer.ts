import { IAppState } from './state'
import { UPDATE_USER, ADD_GROUP, ADD_USER_TO_GROUP, REMOVE_USER_FROM_GROUP, CLEAR } from './actions'

const initialState: IAppState = {
    user: {
        id: '',
        username: '',
        email: '',
        age: 0,
        gender: '',
    },
    groups: []
}  

function updateUser(state, action): IAppState {
    return Object.assign({}, state, 
    {
        user: action.user
    });
}

function addGroup(state, action): IAppState {
    return Object.assign({}, state, {
        groups: [...state.groups, action.group]
    });
}

function addUserToGroup(state, action){
    state.groups.find(group => group.id == action.group.id).users = action.group.users;
    return state;
}

function removeUserFromGroup(state, action){
    let index = state.groups.findIndex(group => group.id == action.group.id);
    if(index != -1){
        state.groups[index].users.forEach((user, i) => {
            if(user._id == action.group.user_id) {
                state.groups[index].users.splice(i, 1);
            }
            if(action.group.user_id == action.group.current_user_id){
                state.groups.splice(index, 1);
            }
        });
    }
    return state;
}

function clear(state): IAppState {
    return state;
}

export function reducer(state:IAppState = initialState, action){
    switch(action.type){
      case UPDATE_USER:
        return updateUser(state, action); 
      case ADD_GROUP:
        return addGroup(state, action);  
      case ADD_USER_TO_GROUP:
        return addUserToGroup(state, action);
      case REMOVE_USER_FROM_GROUP:
        return removeUserFromGroup(state, action);    
      case CLEAR:
        return clear(initialState);
      default:
        return state;
    }
}
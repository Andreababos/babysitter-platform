import { UsersActions } from './users.actions';
import { UsersState } from '../store';
import { tassign } from 'tassign';
import { User } from '../../entities/user';
import { LoginActions } from '../login/login.actions';

const INITIAL_STATE: UsersState = { 
    users: [], 
    errorMessage: '', 
    loading: false
}

export function UsersReducer(state: UsersState = INITIAL_STATE, action:any) {
 switch (action.type) {

    case UsersActions.START_SPINNER:
        //start the spinner
        return tassign(state, { loading: true});
    
    case UsersActions.STOP_SPINNER:
        //start the spinner
        return tassign(state, { loading: false});
    
    case UsersActions.FAILURE:
        return tassign(state, { errorMessage: action.payload, loading: false});
    
    case UsersActions.CREATE_USER:
        const newArray= [... state.users, action.payload]; 
        return tassign(state, { users: newArray, loading: false });

    case UsersActions.GET_USERS:
        return tassign(state, { users: action.payload, loading: false });

    case UsersActions.UPDATE_USER:
        const updateArray= [... state.users]; 
        let index = updateArray.findIndex(x=>x._id == action.payload._id);
        return tassign(state, { users: updateArray, loading: false });

    case UsersActions.DELETE_USER:
        return tassign(state, { users: state.users.filter(x => x._id !== action.payload), loading: false });

    default:
        return state;
}

}

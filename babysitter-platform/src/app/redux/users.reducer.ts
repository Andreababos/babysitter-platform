import { UsersActions } from './users.actions';
import { SittersState } from './store';
import { tassign } from 'tassign';
import { User } from '../entities/user';

const INITIAL_STATE: SittersState = { 
    users: [], 
    errorMessage: '', 
    loading: false, 
    userData: {
        'isAuthenticated' : false,
        'userId': '',
        'expirationDate': '',
        'role': ''
    }
}

export function UsersReducer(state: SittersState = INITIAL_STATE, action:any) {
 switch (action.type) {

    case UsersActions.START_SPINNER:
        //start the spinner
        return tassign(state, { loading: true});
        
    case UsersActions.FAILURE:
        return tassign(state, { errorMessage: action.payload, loading: false});

    case UsersActions.CREATE_USER:
        const newArray= [... state.users, action.payload]; 
        return tassign(state, { users: newArray, loading: false });

    case UsersActions.GET_USERS:
        return tassign(state, { users: action.payload, loading: false });

    case UsersActions.UPDATE_USER:
        const updateArray= [... state.users]; 
        let index = updateArray.indexOf(action.payload.id);
        if(index >= 0){
            updateArray[index] = action.payload;
        }
        return tassign(state, { users: updateArray, loading: false });

    case UsersActions.DELETE_USER:
        return tassign(state, { users: state.users.filter(x => x._id !== action.payload), loading: false });

    case UsersActions.LOGIN:
        return tassign(state, { userData: action.payload, loading: false });   

    case UsersActions.LOGOUT:
        return tassign(state, { userData: {'isAuthenticated' : false, 'userId': '', 'expirationDate': '', 'role': ''}, loading: false });

    default:
        return state;
}

}

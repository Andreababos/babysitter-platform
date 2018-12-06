import { LoginActions } from './login.actions';
import { tassign } from 'tassign';
import { Userdata } from 'src/app/entities/userdata';

const INITIAL_STATE: Userdata = { 'isAuthenticated' : false, 'userId': '', 'expirationDate': '', 'role': ''}

export function LoginReducer(state: Userdata = INITIAL_STATE, action:any) {
 switch (action.type) {

   
    case LoginActions.LOGIN:
        return tassign(state, {'isAuthenticated' : true, 'userId': action.payload.userId, 'expirationDate': action.payload.expirationDate, 'role': action.payload.role});   

    case LoginActions.LOGOUT:
        return tassign(state, { 'isAuthenticated' : false, 'userId': '', 'expirationDate': '', 'role': ''});

    default:
        return state;
}

}

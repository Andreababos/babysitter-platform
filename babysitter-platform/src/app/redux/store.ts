import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';
import { User } from '../entities/user';
import { UsersReducer } from './users.reducer';
import { Userdata } from '../entities/userdata';

export class SittersState {
    users: User[];
    errorMessage: string;
    loading: boolean;
    userData: Userdata;

    static getEmptyState() {
        return { 
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
    }
}


export class IAppState {
    users?: SittersState;
}
export const rootReducer = combineReducers<IAppState>({
    users: UsersReducer,

//router: routerReducer
});

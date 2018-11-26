import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';
import { User } from '../entities/user';
import { UsersReducer } from './users.reducer';

export class SittersState {
    users: User[];

    static getEmptyState() {
        return { users: []}
    }
}
export class IAppState {
    users?: SittersState;
}
export const rootReducer = combineReducers<IAppState>({
    users: UsersReducer,

//router: routerReducer
});

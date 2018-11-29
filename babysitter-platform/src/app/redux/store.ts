import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';
import { User } from '../entities/user';
import { UsersReducer } from './users.reducer';
import { Service } from '../entities/service';

export class SittersState {
    users: User[];
    errorMessage: string;
    loading: boolean;

    static getEmptyState() {
        return { users: [], errorMessage: '', loading: false}
    }
}

export class ServicesState {
    services: Service[];
    errorMessage: string;
    loading: boolean;

    static getEmptyState() {
        return { services: [], errorMessage: '', loading: false}
    }
}


export class IAppState {
    users?: SittersState;
}
export const rootReducer = combineReducers<IAppState>({
    users: UsersReducer,

//router: routerReducer
});

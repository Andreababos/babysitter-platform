import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';
import { User } from '../entities/user';
import { UsersReducer } from './users/users.reducer';
import { Userdata } from '../entities/userdata';
import { LoginReducer } from './login/login.reducer';
import { Booking } from '../entities/booking';
import { BookingReducer } from './booking/booking.reducer';

export class SittersState {
    users: User[];
    errorMessage: string;
    loading: boolean;

    static getEmptyState() {
        return { 
            users: [], 
            errorMessage: '', 
            loading: false
        }
    }
}

export class LoginState {
    isAuthenticated : boolean;
    userId: string;
    expirationDate: any;
    role: string;


    static getEmptyState() {
        return { 
                isAuthenticated : false,
                userId: '',
                expirationDate: '',
                role: ''

        }
    }
}

export class BookingState {
    bookings: Booking[]

    static getEmptyState() {
        return { 
                bookings: []
        }
    }
}


export class IAppState {
    users?: SittersState;
    userData?: LoginState;
    bookings?: BookingState;
}
export const rootReducer = combineReducers<IAppState>({
    users: UsersReducer,
    userData: LoginReducer,
    bookings: BookingReducer

//router: routerReducer
});

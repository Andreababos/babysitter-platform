import { tassign } from 'tassign';
import { BookingActions } from './booking.actions';
import { BookingState } from '../store';
import { Booking } from 'src/app/entities/booking';

const INITIAL_STATE: BookingState = {'bookings': []}

export function BookingReducer(state: BookingState = INITIAL_STATE, action:any) {
 switch (action.type) {

   
    case BookingActions.CREATE_BOOKING:
        const newArray= [... state.bookings, action.payload]; 
        return tassign(state, { bookings: newArray});  

    case BookingActions.GET_BOOKINGS:
        return tassign(state, { bookings: action.payload});


    default:
        return state;
}

}

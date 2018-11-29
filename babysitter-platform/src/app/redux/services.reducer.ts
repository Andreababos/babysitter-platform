import { ServicesActions } from './services.actions';
import { ServicesState } from './store';
import { tassign } from 'tassign';

const INITIAL_STATE: ServicesState = { services: [], errorMessage:'', loading: false};

export function ServicesReducer(state: ServicesState = INITIAL_STATE, action:any) {
 switch (action.type) {

    case ServicesActions.START_SPINNER:
        //start the spinner
        return tassign(state, { loading: true});
        
    case ServicesActions.FAILURE:
        return tassign(state, { errorMessage: action.payload, loading: false});

    case ServicesActions.CREATE_SERVICE:
        const newArray= [... state.services, action.payload]; 
        return tassign(state, { services: newArray, loading: false });

    case ServicesActions.GET_SERVICES:
        return tassign(state, { services: action.payload });

    case ServicesActions.UPDATE_SERVICE:
        const updateArray= [... state.services]; 
        let index = updateArray.indexOf(action.payload.id);
        if(index >= 0){
            updateArray[index] = action.payload;
        }
        return tassign(state, { services: updateArray });

    case ServicesActions.DELETE_SERVICE:
        return tassign(state, { services: state.services.filter(x => x.id !== action.payload)});
    
    default:
        return state;
}

}

import {INITIAL_STATE} from './initial.state';

import {
    USER_LOGIN, USER_LOGOUT
} from './actions/user.actions';
import { ADD_MEASUREMENT, ADD_MEASUREMENTS } from './actions/measurements.actions';


export const reducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                user: action.change.user
            }
        case USER_LOGOUT:
            return {
                ...state,
                user: action.change.user
            }
        case ADD_MEASUREMENTS: {
            return {
                ...state,
                measurements: action.change.measurements
            }
        }
        case ADD_MEASUREMENT: {
            return {
                ...state,
                measurements: [...state.measurements, action.change.measurement]
            }
        }
        default:
            return state;
    }
};
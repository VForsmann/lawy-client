import { Measurement } from '../../interfaces/measurement.interface';
import { nanoid } from 'nanoid';

export const ADD_MEASUREMENTS = 'ADD_MEASUREMENTS';
export const ADD_MEASUREMENT = 'ADD_MEASUREMENT';

export const addMeasurements = (measurements: Array<Measurement>) => {
    return {
        type: ADD_MEASUREMENTS,
        change: {
            id: nanoid(),
            measurements
        }
    };
};

export const addMeasurement = (measurement: Measurement) => {
    return {
        type: ADD_MEASUREMENT,
        change: {
            id: nanoid(),
            measurement
        }
    };
};
import { Measurement } from './measurement.interface';
import { User } from './user.interface';

export interface State {
    user?: User,
    measurements: Array<Measurement>
}
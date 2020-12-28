import { User } from '../../interfaces/user.interface';
import { nanoid } from 'nanoid';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

export const userLogin = (user: User) => {
    return {
        type: USER_LOGIN,
        change: {
            id: nanoid(),
            user
        }
    };
};

export const userLogout = () => {
    return {
        type: USER_LOGOUT,
        change: {
            id: nanoid(),
            user: undefined
        }
    };
};
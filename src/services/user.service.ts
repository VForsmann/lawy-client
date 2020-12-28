import { LoginCredentials } from '../interfaces/user.interface';
import BaseService from './base.service';


class UserService {

    userService: any;
    client: any;

    constructor() {
        this.client = new BaseService().client;
        this.userService = this.client.service("users");
    }

    async login(credentials?: LoginCredentials) {
        try {
            if (!credentials) {
                // Try to authenticate using an existing token
                return await this.client.reAuthenticate();
            } else {
                // Otherwise log in with the `local` strategy using the credentials we got
                return await this.client.authenticate({
                    strategy: 'local',
                    ...credentials
                });
            }
        } catch (e) {
            throw new Error("LOGIN_ERROR");
        }
    }

    async logout() {
        return await this.client.logout();
    }
    

}

export default new UserService();
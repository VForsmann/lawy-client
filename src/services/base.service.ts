import io from 'socket.io-client';
import feathers from '@feathersjs/client';
import socketio from '@feathersjs/socketio-client';
import createApplication from '@feathersjs/feathers';

let instance: BaseService | undefined = undefined;

export default class BaseService {

    socket: SocketIOClient.Socket;
    client: any;


    constructor() {
        if(!instance) {
            instance = this;
        }
        //@ts-ignore
        const url = API_URL;
        //@ts-ignore
        const path = API_PATH;
        this.socket = io(url, {
            path: path,
            transports: ['websocket'],
            forceNew: true,
            //@ts-ignore
            secure: API_SECURE === "secure" ? true : false
        });
        this.client = feathers();
        this.client
        this.client.configure(socketio(this.socket));
        this.client.configure(feathers.authentication());

        return instance;
    }
}
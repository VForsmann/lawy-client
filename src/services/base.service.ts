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
        const url = webpackJsonp ? 'http://localhost:80/' : 'http://54.160.68.171/'
        this.socket = io(url, {
            transports: ['websocket'],
            forceNew: true
        });
        this.client = feathers();
        this.client
        this.client.configure(socketio(this.socket));
        this.client.configure(feathers.authentication());

        return instance;
    }
}
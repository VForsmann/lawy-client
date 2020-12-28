import { HttpClient } from './http-client';

export const httpClient = new HttpClient({ baseURL: 'http:' + '//' + "localhost" + ':8090/api/' });

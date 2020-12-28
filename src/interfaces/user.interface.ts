import { EntityInterface } from "./base.interface";

export interface User extends EntityInterface {
    email: string
}

export interface LoginCredentials {
    email: string,
    password: string
}
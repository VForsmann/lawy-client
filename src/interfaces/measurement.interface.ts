import { EntityInterface } from "./base.interface";

export interface Measurement extends EntityInterface {
    date: number,
    weight: number,
    symbol?: string
}
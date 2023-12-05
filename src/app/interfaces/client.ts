import { Card } from "./card";

export interface Client {
    fullname:string;
    urlImg:string;
    email:string;
    cards:Card[];
}

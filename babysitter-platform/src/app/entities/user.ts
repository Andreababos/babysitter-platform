import { Rating } from "./rating";
import { Baby } from "./baby";

export class User {
    _id: string;
    role: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    gender?: string;
    birthDate?: any;
    bio?: string = '';
    picture?: string = 'avatar.jpg';
    location?: string = '';
    rating?: Rating[];
    phone?: string = '';
    schedule?: any = '';
    filter: string = 'andrea';
}

export class Sitter extends User {
    education?: string = '';
    price?: number;
}

export class Parent extends User {
    babies?: Baby[];
}
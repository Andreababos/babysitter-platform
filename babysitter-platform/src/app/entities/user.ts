import { Rating } from "./rating";
import { Baby } from "./baby";

export class User {
    id: String;
    role: String;
    email: String;
    firstName: String;
    lastName: String;
    gender?: String;
    birthDate: Date;
    bio?: String;
    picture?: String;
    description?: String;
    location?: String;
    rating?: Rating[];
    phone?: String;
    schedule?: any;
}

export class Sitter extends User {
    education?: String;
}

export class Parent extends User {
    babies?: Baby[];
}
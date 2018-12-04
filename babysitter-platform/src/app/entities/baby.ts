import { Rating } from "./rating";

export class Baby {
    _id: String;
    name: String;
    birthDate: Date;
    gender: String;
    specialNeeds?: String;
    description?: String;
    picture?: String;
    rating?: Rating[];
    price?: number;
}
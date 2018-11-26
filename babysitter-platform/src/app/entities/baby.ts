import { Rating } from "./rating";

export class Baby {
    id: String;
    name: String;
    birthDate: Date;
    gender: String;
    specialNeeds?: String;
    description?: String;
    picture?: String;
    rating?: Rating[]
}
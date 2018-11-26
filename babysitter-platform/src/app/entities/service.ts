import { Parent, Sitter } from "./user";
import { Baby } from "./baby";

export class Service {
    id: String;
    date: Date;
    price: number;
    sitter?: Sitter;
    parent?: Parent;
    baby?: Baby;
    details?: String;
    location: String;
    completed: Boolean;
}
import { Parent, Sitter, User } from "./user";
import { Baby } from "./baby";

export class Booking {
    _id: string;
    startDate: Date;
    endDate: Date;
    parentId: string;
    parent: User;
    sitterId: string;
    sitter?: User;
    babyId?: string;
    baby?: Baby;
    details?: string;
    payout: number;
    filter: string = 'andrea';
    type: string = 'booking';
}
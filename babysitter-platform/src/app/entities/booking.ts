export class Booking {
    startDate: Date;
    endDate: Date;
    parentId: string;
    sitterId: string;
    babyId?: string;
    details?: string;
    payout: number;
    filter: string = 'andrea';
    type: string = 'booking';
}
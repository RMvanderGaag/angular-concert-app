import { IConcert } from "./concert.model";
import { IUser } from "./user.model";

export interface ITicket {
    id: string;
    concert: IConcert;
    user: IUser;
    buyDate: Date;
    seatNumber: string;
}
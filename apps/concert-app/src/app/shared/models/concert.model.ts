import { IArtist } from "./artist.model";
import { ILocation } from "./location.model";

export interface IConcert {
    id: string;
    name: string;
    date: Date;
    location: ILocation | undefined;
    artists: Array<IArtist>;
}
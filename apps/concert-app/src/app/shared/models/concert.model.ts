export interface Concert {
    id: number;
    name: string;
    date: Date;
    eighteenPlus: boolean;
    location: string;
    artists: Array<string>;
}
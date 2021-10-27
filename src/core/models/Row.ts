import { Seat } from "./Seat";

export interface Row {
    id: number;
    name: string;
    number_accents: number;
    created_at: any;
    update_at: any;
    seats: Seat[];
}
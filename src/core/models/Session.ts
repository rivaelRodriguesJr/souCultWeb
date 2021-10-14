import { Seat } from "./Seat";

export interface SessionWithoutPlaceFormState {
  id: number;
  date: string;
  time: string;
  room: string;
  ticketsQtd: number;
  planId: number;
}

export interface SessionWithPlaceFormState {
  id: number;
  date: string;
  time: string;
  roomId: number;
  ticketsQtd: number;
  planId: number;
  rows: number[];
}

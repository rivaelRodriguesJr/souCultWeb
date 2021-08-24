import { Seat } from "./Seat";

export interface Room {
  id: number;
  name: string;
  numberSeats: number;
}

export interface RoomsPaged {
  rooms: Room[];
  count: number;
}

export interface DetailedRoom  {
  id?: number;
  name: string;
  image_link?: any;
  created_at?: Date;
  update_at?: Date;
  seats: Seat[];
}

export interface DetailedRoomResponse {
  entity: DetailedRoom;
}

import { Place } from "./Place";

export interface Event {
  id: number,
  name: string;
  tickets_qtd: number;
  total_used: number;
  status: string;
  place: Place;
}

export interface EventsPaged {
  events: Event[];
  count: number;
}

export interface Address {
  street_numbering: string;
  zip_code: string;
  city: string;
  state: string;
}

export interface Session {
  id?: number;
  ticket_type: number;
  moment: Date;
  quantity_tickets: number;
  id_plan: number;
  room: string
}

interface Room {
    id: number,
    name?: string;
    seats: number[];
}

export interface SessionWithPlace {
  id?: number;
  ticket_type: number;
  moment: Date;
  quantity_tickets: number;
  id_plan: number;
  room: Room;
}

export interface DetailedEvent {
  name: string;
  description: string;
  status_id: number;
  address: Address;
  sessions: Session[];
  event_category_id: number;
  banner_link: string;
}

export interface CheckInObj {
  scheduling_id: number,
  scheduling_token: string;
  scheduling_checkin_at: string;
  event_name: string;
  user_name: string;
}

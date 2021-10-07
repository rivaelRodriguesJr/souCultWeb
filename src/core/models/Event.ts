import { Place } from "./Place";

export interface Event {
  id: number,
  name: string;
  tickets_qtd: number;
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

export interface DetailedEventRequest {
  result: {
    id: number;
    name: string;
    description: string;
    link_banner?: string;
    status: {
      id: number;
      name: string;
    };
    category: {
      id: number;
      name: string;
    };
    address: {
      id: number;
      street_numbering: string;
      zip_code: string;
      city: string;
      state: string;
      created_at: Date;
      update_at: Date;
    };
    sessions: Session [];
  }
}

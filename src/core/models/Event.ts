export interface Event {
  id: number,
  name: string;
  tickets_qtd: number;
  status: string;
  place: Place;
}

export interface Place {
  city: string;
  state: string;
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
  room: string;
  quantity_tickets: number;
  id_plan: number;
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
    sessions: {
      id: number;
      ticket_type: number;
      moment: Date;
      room: string;
      quantity_tickets: number;
      id_plan: number;
      created_at: Date;
      update_at: Date;
    } [];
  }
}

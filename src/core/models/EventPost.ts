export interface EventAddressPost {
  street_numbering: string;
  zip_code: string;
  city: string;
  state: string;
}

export interface EventAreaPost {
  id_area: number;
  rows: number[];
}

export interface EventRoomPost {
  id: number;
  areas: EventAreaPost[];
}

export interface EventSessionPost {
  id: number;
  ticket_type: number;
  moment: Date;
  room: EventRoomPost | string;
  quantity_tickets: number;
  id_plan: number;
}

export interface EventPost {
  name: string;
  description: string;
  status_id: number;
  event_category_id: number;
  banner_link: string;
  address: EventAddressPost;
  sessions: EventSessionPost[];
}

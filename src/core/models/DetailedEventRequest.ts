
export interface Status {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Address {
  id: number;
  street_numbering: string;
  zip_code: string;
  city: string;
  state: string;
}

export interface AreaRow {
  id: number;
  name: string;
  number_accents: number;
}

export interface Row {
  id: number;
  name: string;
  number_accents: number;
}

export interface Area {
  id: number;
  name: string;
  rows: Row[];
}

export interface Room {
  id: number;
  name: string;
  image_link: string;
  areas: Area[];
}


export interface SeatsSessionRoom {
  id: number;
  room: Room;
}

export interface Session {
  id: number;
  ticket_type: number;
  moment: Date;
  quantity_tickets: number;
  id_plan: number;
  room: string;
  seatsSessionRooms: SeatsSessionRoom[];
}

export interface Company {
  id: number;
  name: string;
  description: string;
}

export interface Result {
  id: number;
  name: string;
  description: string;
  status: Status;
  category: Category;
  address: Address;
  sessions: Session[];
  company: Company;
  link_banner: string;
}

export interface DetailedEventRequest {
  result: Result;
}

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
  created_at: Date;
  update_at: Date;
}

export interface SeatsSessionRoom {
  id: number;
  created_at: Date;
  update_at: Date;
  areaRow?: any;
  room?: any;
  area?: any;
}

export interface Session {
  id: number;
  ticket_type: number;
  moment: Date;
  quantity_tickets: number;
  id_plan: number;
  created_at: Date;
  update_at: Date;
  room: string;
  seatsSessionRooms: SeatsSessionRoom[];
}

export interface Address2 {
  id: number;
  street_numbering: string;
  zip_code: string;
  city: string;
  state: string;
  created_at: Date;
  update_at: Date;
}

export interface Company {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  update_at: Date;
  address: Address2;
}

export interface Result {
  id: number;
  name: string;
  description: string;
  banner_link: string;
  status: Status;
  category: Category;
  address: Address;
  sessions: Session[];
  company: Company;
}

export interface EventGet {
  result: Result;
}

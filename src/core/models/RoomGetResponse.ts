export interface RoomGetResponseRow {
  id: number;
  name: string;
  number_accents: number;
  created_at: Date;
  update_at: Date;
}

export interface RoomGetResponseArea {
  id: number;
  name: string;
  created_at: Date;
  update_at: Date;
  rows: RoomGetResponseRow[];
}

export interface RoomGetResponseEntity {
  id: number;
  name: string;
  image_link?: any;
  created_at: Date;
  update_at: Date;
  areas:RoomGetResponseArea[];
}

export interface RoomGetResponse {
  entity: RoomGetResponseEntity;
}

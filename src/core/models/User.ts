export interface User {
  id?: number;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  password: string;
  "user-type-id": number;
}

export interface UserPayload {
  name: string;
  username: string;
  password: string;
  document_id: string;
  phone: string;
  company_type_id: number;
  company_id: number;
}

export interface UserPagedDetails {
  id: number;
  name: string;
  createDate: string;
  username: string;
}

export interface UsersPaged {
  events: UserPagedDetails[];
  count: number;
}

export interface UserDetails {
  id: number;
  name: string;
  username: string;
  password: string;
  document_id: string;
  phone: string;
}

export interface UserRequest {
  result: UserDetails;
}

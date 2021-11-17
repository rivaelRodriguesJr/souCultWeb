export interface LoginResponse {
  user: {
    id: number;
    name: string;
    username: string;
    document: string;
    phone: string;
    company_type_id: number;
    company_id: number;
    created_at: Date;
    update_at: Date;
  };
  token: string;
}

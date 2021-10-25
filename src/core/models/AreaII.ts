import { Row } from "./Row";

export interface Area {
  id: number;
  name: string;
  created_at: any;
  update_at: any;
  rows: Row[];
}

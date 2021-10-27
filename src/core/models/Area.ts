import AreaRow from "./AreaRow";

interface Area {
  id: number;
  name: string;
  rows: AreaRow[];
  created_at?: Date;
  update_at?: Date;
}

export default Area;

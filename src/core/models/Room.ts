import Area from "./Area";

interface Room {
  id: number;
  name: string;
  image_link?: string;
  areas: Area[];
  created_at?: Date;
  update_at?: Date;
}

export default Room;

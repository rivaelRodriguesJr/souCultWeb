import { CircularProgress, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteButton from 'core/components/DeleteButton';
import { Room } from 'core/models/Room';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles.scss';

interface Props {
  rooms: Room[];
  isLoading: boolean;
  handleDelete: (roomId: number) => void;
}

const RoomListTable = ({ rooms, isLoading, handleDelete }: Props) => {

  return (
    <div>
      <Table responsive className="table" >
        <thead className="tableHeader">
          <tr>
            <th>Nome da sala</th>
            <th>Qtd. Assentos</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody className="tableBody">
          {isLoading &&
            <tr>
              <td className="text-center" colSpan={4}><CircularProgress color="primary" /></td>
            </tr>}
          {rooms?.map((room, index) => (
            <tr key={index}>
              <td>{room?.name}</td>
              <td>{room?.numberSeats}</td>
              <td>
                <Link
                  to={`/cultural-company/rooms/${room.id}`}
                >
                  <IconButton>
                    <EditIcon color="primary" />
                  </IconButton>
                </Link>
                <DeleteButton handleDelete={() => room?.id && handleDelete(room.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default RoomListTable;

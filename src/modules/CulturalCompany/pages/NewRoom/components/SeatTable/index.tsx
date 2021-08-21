import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteButton from 'core/components/DeleteButton';
import { Seat } from 'core/models/Seat';
import { Table } from 'react-bootstrap';

interface Props {
  seats: Seat[];
  handleDelete: (seatId: number) => void;
  handleEdit: (seatId: number) => void;
}

const SeatTable = ({ seats, handleDelete, handleEdit }: Props) => {

  return (

    <Table responsive className="table" >
      <thead className="tableHeader">
        <tr>
          <th>Área</th>
          <th>Fileira</th>
          <th>Qtd. Assentos</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {seats.map((seat, index) => (
          <tr key={index}>
            <td>{seat.area}</td>
            <td>{seat.row}</td>
            <td>{seat.quantity}</td>
            <td>
              <IconButton onClick={() => seat?.id && handleEdit(seat.id)}>
                <EditIcon color="primary" />
              </IconButton>

              <DeleteButton handleDelete={() => seat?.id && handleDelete(seat.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>);

}

export default SeatTable;

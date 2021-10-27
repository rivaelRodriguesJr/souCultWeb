import { Seat } from 'core/models/Seat';
import { Table } from 'react-bootstrap';

interface SeatTableProps {
  seats: Seat[];
}

const SeatTable = ({ seats = [] }: SeatTableProps) => {

  return (
    <Table responsive className="table" >
      <thead className="tableHeader">
        <tr>
          <th className="text-center">Área</th>
          <th className="text-center">Fileira</th>
          <th className="text-center">Qtd. assentos</th>
        </tr>
      </thead>
      <tbody>
        {seats?.map((seat, index) => (
          <tr key={index}>
            {/* <td className="pt-4 text-center">{seat.area}</td>
            <td className="pt-4 text-center">{seat.row}</td>
            <td className="pt-4 text-center">{seat.quantity}</td> */}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default SeatTable;

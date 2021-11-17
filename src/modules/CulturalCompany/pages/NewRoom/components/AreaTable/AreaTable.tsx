import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteButton from 'core/components/DeleteButton';
import { Table } from 'react-bootstrap';

export interface AreaTableRowModel {
  id: number;
  area: string;
  row: string;
  seatsQtd: number;
}

interface AreaTableProps {
  areaTableRows: AreaTableRowModel[];
  handleDelete: (seatId: number) => void;
  handleEdit: (seatId: number) => void;
  isEditing: boolean;
}

const AreaTable = ({ areaTableRows, handleDelete, handleEdit, isEditing }: AreaTableProps) => {

  return (

    <Table responsive className="table" >
      <thead className="tableHeader">
        <tr>
          <th>Área</th>
          <th>Fileira</th>
          <th>Qtd. Assentos</th>
          {!isEditing && <th>Ações</th>}
        </tr>
      </thead>
      <tbody>
        {areaTableRows.map((tableRow, index) => (
          <tr key={index}>
            <td>{tableRow.area}</td>
            <td>{tableRow.row}</td>
            <td>{tableRow.seatsQtd}</td>
            {!isEditing &&
              <td>
                <IconButton onClick={() => tableRow?.id && handleEdit(tableRow.id)}>
                  <EditIcon color="primary" />
                </IconButton>

                <DeleteButton handleDelete={() => tableRow?.id && handleDelete(tableRow.id)} />
              </td>
            }
          </tr>
        ))}
      </tbody>
    </Table>);

}

export default AreaTable;

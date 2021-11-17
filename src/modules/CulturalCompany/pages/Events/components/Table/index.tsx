import { CircularProgress, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Event } from "core/models/Event";
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles.scss';

interface Props {
  events: Event[];
  isLoading: boolean;
}

const TableStandard = ({ events, isLoading }: Props) => {

  return (
    <div>
      <Table responsive className="table" >
        <thead className="tableHeader">
          <tr>
            <th>Nome do evento</th>
            <th>Ingressos agendados</th>
            <th>Status</th>
            <th>Local</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="tableBody">
          {isLoading && 
          <tr>
            <td className="text-center" colSpan={4}><CircularProgress  color="primary"/></td>
          </tr>}
          {events.map((event, index) => (
            <tr key={index}>
              <td>{event?.name}</td>
              <td>{`${event?.total_used}/${event?.tickets_qtd} `}</td>
              <td>{event?.status}</td>
              <td>{`${event?.place?.city}/${event?.place?.state}`}</td>
              <td>
                <Link
                  to={`/cultural-company/events/${event.id}`}
                >
                  <IconButton>
                    <EditIcon color="primary" />
                  </IconButton>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TableStandard;

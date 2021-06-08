import CircularProgress from '@material-ui/core/CircularProgress';
import { Event } from "core/models/Event";
import React from "react";
import { Table } from 'react-bootstrap';
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
            <th>Ingressos disponíveis</th>
            <th>Status</th>
            <th>Local</th>
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
              <td>{event?.tickets_qtd}</td>
              <td>{event?.status}</td>
              <td>{`${event?.place?.city}/${event?.place?.state}`}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TableStandard;

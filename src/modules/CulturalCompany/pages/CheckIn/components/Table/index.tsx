import { CircularProgress } from '@material-ui/core';
import { CheckInObj } from "core/models/Event";
import moment from "moment";
import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import './styles.scss';

interface Props {
  checkIns: CheckInObj[];
  isLoading: boolean;
}

const TableStandard = ({ checkIns, isLoading }: Props) => {

  useEffect(() => {
    moment.locale('pt-br')
  }, []);
  
  return (
    <div>
      <Table responsive className="table" >
        <thead className="tableHeader">
          <tr>
            <th>Evento</th>
            <th>Token</th>
            <th>Data</th>
            <th>Horário</th>
            <th>Usuário</th>
          </tr>
        </thead>
        <tbody className="tableBody">
          {isLoading && 
          <tr>
            <td className="text-center" colSpan={4}><CircularProgress  color="primary"/></td>
          </tr>}
          {checkIns.map((checkIn) => (
            <tr key={checkIn?.scheduling_id}>
              <td>{checkIn?.event_name}</td>
              <td>{checkIn?.scheduling_token}</td>
              <td>{moment(checkIn?.scheduling_checkin_at).format('L')}</td>
              <td>{ moment(checkIn?.scheduling_checkin_at).format('LT')}</td>
              <td>{checkIn?.user_name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TableStandard;

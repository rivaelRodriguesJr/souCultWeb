import { IconButton } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteButton from "core/components/DeleteButton";
import { Session } from "core/models/Event";
import { Plan } from "core/models/Plan";
import moment from 'moment';
import { Table } from 'react-bootstrap';
import './styles.scss';

interface Props {
  sessions: Session[];
  plans: Plan[];
  handleDelete: (sessionId: number) => void;
  handleEdit: (sessionId: number) => void;
}

const TableStandard = ({ sessions, plans, handleDelete, handleEdit }: Props) => {

  return (
    <>
      <Table responsive className="table" >
        <thead className="tableHeader">
          <tr>
            <th>Data</th>
            <th>Horário</th>
            <th>Sala</th>
            <th>Qtd. ingressos</th>
            <th>Plano</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {sessions?.map((session, index) => (
            <tr key={index}>
              <td className="pt-4">{moment(session.moment).format('DD/MM/YYYY')}</td>
              <td className="pt-4">{moment(session.moment).format('HH:mm')}</td>
              <td className="pt-4">{session.room}</td>
              <td className="pt-4">{session.quantity_tickets}</td>
              <td className="pt-4">{plans.find(plan => Number(plan.id) === Number(session.id_plan))?.name}</td>
              <td>
                <IconButton onClick={() => session?.id && handleEdit(session.id)}>
                  <EditIcon color="primary" />
                </IconButton>

                <DeleteButton handleDelete={() => session?.id && handleDelete(session.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default TableStandard;
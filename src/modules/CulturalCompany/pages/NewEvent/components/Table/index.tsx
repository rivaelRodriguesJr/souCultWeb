import { IconButton } from "@material-ui/core";
import DeleteButton from "core/components/DeleteButton";
import { Plan } from "core/models/Plan";
import { SessionWithoutPlaceFormState } from "core/models/Session";
import React from "react";
import { Table } from 'react-bootstrap';
import './styles.scss';
import EditIcon from '@material-ui/icons/Edit';

interface Props {
  sessions: SessionWithoutPlaceFormState[];
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
          {sessions.map((session, index) => (
            <tr key={index}>
              <td className="pt-4">{session.date}</td>
              <td className="pt-4">{session.time}</td>
              <td className="pt-4">{session.room}</td>
              <td className="pt-4">{session.ticketsQtd}</td>
              <td className="pt-4">{plans.find(plan => Number(plan.id) === Number(session.planId))?.name}</td>
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
import './styles.scss';

import { plans } from 'core/models/enums/PlanType';
import { Session } from 'core/models/Event';
import { SessionWithoutPlaceFormState } from 'core/models/Session';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Controller, useForm } from 'react-hook-form';

import StandardTable from '../Table';
import ControlledFormControl from 'core/components/ControlledFormControl';
import { EventRoomPost, EventSessionPost } from 'core/models/EventPost';
import SessionTable from '../SessionTable';

interface WithoutPlaceProps {
  sessions: EventSessionPost[];
  setSessions: (sessions: EventSessionPost[]) => void;
}

const WithoutPlace = ({ sessions, setSessions }: WithoutPlaceProps) => {

  const { handleSubmit, formState: { errors }, control, getValues, reset, setValue } = useForm<SessionWithoutPlaceFormState>();


  const formToSession = (formState: SessionWithoutPlaceFormState): EventSessionPost => {
    const momentDate: Date = moment(`${formState.date} ${formState.time}`, 'YYYY-MM-DD HH:mm').toDate();
    return {
      id: formState.id,
      id_plan: formState.planId,
      moment: momentDate,
      quantity_tickets: formState.ticketsQtd,
      room: formState.room,
      ticket_type: formState.planId,
    }
  };

  const onSubmit = (formState: SessionWithoutPlaceFormState) => {
    if (!formState?.id) {
      const session: EventSessionPost = formToSession(formState);
      session.id = new Date().getTime()
      setSessions([...sessions, session]);
    } else {
      const index = sessions.findIndex(session => Number(session.id) === Number(formState.id));
      sessions[index] = formToSession(formState);
    }

    reset();
  }

  const handleSessionDelete = (sessionId: number) => {
    const s: EventSessionPost[] = sessions.slice();
    const index = s.findIndex(session => Number(session.id) === Number(sessionId));
    s.splice(index, 1);
    setSessions(s);
  }

  const handleSessionEdit = (sessionId: number) => {
    const session = sessions.find(session => Number(session.id) === Number(sessionId));

    let time = '';
    let date = '';

    if (session?.moment) {
      time = moment(session.moment).format('HH:mm');
      date = moment(session.moment).format('YYYY-MM-DD');
    }

    let room = '';

    if (session?.room && typeof session.room === 'string') {
      room = session.room;
    }

    setValue('id', session?.id || 0);
    setValue('date', date);
    setValue('planId', session?.id_plan || -1);
    setValue('room', room);
    setValue('ticketsQtd', session?.quantity_tickets || -1);
    setValue('time', time);
  };

  const getRoomName = (room: EventRoomPost | string): string => {
    if (typeof room === 'string') return room;

    return '-';
  };

  return (
    <div className="mt-5">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>

          <Form.Group as={Col} sm="3">
            <Form.Label>Data<i className="text-danger">*</i></Form.Label>
            <Controller
              name="date"
              control={control}
              render={({ field, fieldState }) =>
                <>
                  <Form.Control
                    type="date"
                    isInvalid={fieldState.invalid}
                    {...field}
                  />
                  {errors[field.name] &&
                    <Form.Control.Feedback type="invalid">
                      {errors[field.name]?.message}
                    </Form.Control.Feedback>
                  }
                </>
              }
              rules={{
                required: 'Campo obrigatório'
              }}
            />
          </Form.Group>

          <Form.Group as={Col} sm="3">
            <Form.Label>Horário<i className="text-danger">*</i></Form.Label>
            <Controller
              name="time"
              control={control}
              render={({ field, fieldState }) =>
                <>
                  <Form.Control
                    type="time"
                    isInvalid={fieldState.invalid}
                    {...field}
                  />
                  {errors[field.name] &&
                    <Form.Control.Feedback type="invalid">
                      {errors[field.name]?.message}
                    </Form.Control.Feedback>
                  }
                </>
              }
              rules={{
                required: 'Campo obrigatório'
              }}
            />
          </Form.Group>

          <Form.Group as={Col} sm="3">
            <Form.Label>Sala<i className="text-danger">*</i></Form.Label>
            <Controller
              name="room"
              control={control}
              render={({ field, fieldState }) =>
                <>
                  <Form.Control
                    type="text"
                    isInvalid={fieldState.invalid}
                    {...field}
                  />
                  {errors[field.name] &&
                    <Form.Control.Feedback type="invalid">
                      {errors[field.name]?.message}
                    </Form.Control.Feedback>
                  }
                </>
              }
              rules={{
                required: 'Campo obrigatório'
              }}
            />
          </Form.Group>

          <Form.Group as={Col} sm="3">
            <Form.Label>Qtd. Ingressos<i className="text-danger">*</i></Form.Label>
            <Controller
              name="ticketsQtd"
              control={control}
              render={({ field, fieldState }) =>
                <>
                  <Form.Control
                    type="number"
                    isInvalid={fieldState.invalid}
                    {...field}
                  />
                  {errors[field.name] &&
                    <Form.Control.Feedback type="invalid">
                      {errors[field.name]?.message}
                    </Form.Control.Feedback>
                  }
                </>
              }
              rules={{
                required: 'Campo obrigatório',
                validate: () => Number(getValues('ticketsQtd')) >= 0 || 'Campo inválido'
              }}
            />
          </Form.Group>

          <Form.Group as={Col} sm="3">
            <Form.Label>Plano<i className="text-danger">*</i></Form.Label>
            <Controller
              name="planId"
              control={control}
              render={({ field, fieldState }) =>
                <>
                  <Form.Control
                    as="select"
                    isInvalid={fieldState.invalid}
                    {...field}
                  >
                    <option value={-1}>Selecione</option>
                    {plans.map(plan => (
                      <option key={plan.id} value={plan.id}>{plan.name}</option>
                    ))}
                  </Form.Control>
                  {errors[field.name] &&
                    <Form.Control.Feedback type="invalid">
                      {errors[field.name]?.message}
                    </Form.Control.Feedback>
                  }
                </>
              }
              rules={{
                required: 'Campo obrigatório',
                validate: () => Number(getValues('planId')) !== Number(-1) || 'Campo obrigatório'
              }}
            />
          </Form.Group>
        </Row>

        <Row className="justify-content-end">
          <Col sm="2">
            <Button
              type="submit"
              className="button"
              variant="secondary"
            >Adicionar sessão</Button>
          </Col>
        </Row>

        <SessionTable
          sessions={sessions.map(session => {
            return {
              id: session.id,
              id_plan: session.id_plan,
              moment: session.moment,
              quantity_tickets: session.quantity_tickets,
              room: getRoomName(session.room),
            };
          })}
          plans={plans}
          handleEdit={handleSessionEdit}
          handleDelete={console.log}
        />
      </Form>
    </div>
  );
}

export default WithoutPlace;

import { plans } from 'core/models/enums/PlanType';
import { Session } from 'core/models/Event';
import { SessionWithoutPlaceFormState } from 'core/models/Session';
import moment from 'moment';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import StandardTable from '../Table';
import './styles.scss';

interface Props {
  sessions: Session[];
  setSessions: (sessions: Session[]) => void;
}

const WithoutPlace = ({ sessions, setSessions }: Props) => {

  const { handleSubmit, formState: { errors }, control, getValues, reset, setValue } = useForm<SessionWithoutPlaceFormState>();

  const onSubmit = (formState: SessionWithoutPlaceFormState) => {
    if (!formState?.id) {
      const session: Session = formToSession(formState);
      session.id = new Date().getTime()
      setSessions([...sessions, session]);
    } else {
     const index = sessions.findIndex(session => Number(session.id) === Number(formState.id));
     sessions[index] = formToSession(formState);
    }

    reset();  
  }

  const formToSession = (formState: SessionWithoutPlaceFormState): Session => {
    const momentDate: Date = moment(`${formState.date} ${formState.time}`, 'YYYY-MM-DD HH:mm').toDate();
    return {
      id: formState.id,
      id_plan: formState.planId,
      moment: momentDate,
      quantity_tickets: formState.ticketsQtd,
      room: formState.room,
      ticket_type: formState.planId,
    }
  }

  const handleSessionDelete = (sessionId: number) => {
    const s: Session[] = sessions.slice();
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

    setValue('id', session?.id);
    setValue('date', date);
    setValue('planId', session?.id_plan || -1);
    setValue('room', session?.room || '');
    setValue('ticketsQtd', session?.quantity_tickets || -1);
    setValue('time', time);
  }

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

          <StandardTable
            sessions={sessions}
            plans={plans}
            handleDelete={handleSessionDelete}
            handleEdit={handleSessionEdit}
          />
        </Form>
      </div>
  );
}

export default WithoutPlace;

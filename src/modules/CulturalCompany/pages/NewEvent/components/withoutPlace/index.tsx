import { plans as plansMock } from 'core/models/enums/PlanType';
import { Session } from 'core/models/Event';
import { Plan } from 'core/models/Plan';
import { SessionWithoutPlaceFormState } from 'core/models/Session';
import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import StandardTable from '../Table';
import './styles.scss';
import moment from 'moment';

interface Props {
  submit: (data: Session[]) => void
}

const WithoutPlace = ({ submit }: Props) => {

  const { handleSubmit, formState: { errors }, control, getValues, reset, setValue } = useForm<SessionWithoutPlaceFormState>();

  const [plans, setPlans] = React.useState<Plan[]>([]);
  const [sessions, setSessions] = React.useState<SessionWithoutPlaceFormState[]>([]);

  const onSubmit = (formState: SessionWithoutPlaceFormState) => {
    if (!formState?.id) {
      formState.id = new Date().getTime();
      setSessions([...sessions, formState]);
    } else {
     const index = sessions.findIndex(session => Number(session.id) === Number(formState.id));
     sessions[index] = formState;
    }

    reset();  
  }

  React.useEffect(() => {
    // makePrivateRequest<Plan[]>({ method: 'GET', url: '/plans' }).then(({ data }) => setPlans(data));
    setPlans(plansMock);
  }, [plans]);

  const handleSessionDelete = (sessionId: number) => {
    console.log(sessionId);
  }

  const handleSessionEdit = (sessionId: number) => {
    const session = sessions.find(session => Number(session.id) === Number(sessionId));

    setValue('id', session?.id);
    setValue('date', session?.date || '');
    setValue('planId', session?.planId || -1);
    setValue('room', session?.room || '');
    setValue('ticketsQtd', session?.ticketsQtd || -1);
    setValue('time', session?.time || '');
  }

  const handleCreateEvent = () => {
    const s: Session[] = sessions.map(session => {
      const momentDate: Date = moment(`${session.date} ${session.time}`, 'YYYY-MM-DD HH:mm').toDate();
      return {
        id: session.id || 0,
        id_plan: session.planId,
        moment: momentDate,
        quantity_tickets: session.ticketsQtd,
        room: session.room,
        ticket_type: session.planId
      };
    });

    submit(s);
  }

  return (
    <>
      <div className="container">
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

          <Row>
            <Form.Group as={Col} sm={12} className="d-flex justify-content-end">
              <Button type="submit" variant="gray">Adicionar sessão</Button>
            </Form.Group>
          </Row>

          <StandardTable
            sessions={sessions}
            plans={plans}
            handleDelete={handleSessionDelete}
            handleEdit={handleSessionEdit}
          />
          <Col sm="3">
            <Button 
              type="button" 
              className="button" 
              variant="sea-blue-1"
              onClick={handleCreateEvent}
            >Criar evento</Button>
          </Col>
        </Form>
      </div>
    </>
  );
}

export default WithoutPlace;

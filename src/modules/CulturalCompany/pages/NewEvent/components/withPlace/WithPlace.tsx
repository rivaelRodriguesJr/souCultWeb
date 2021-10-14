import ControlledSelect from 'core/components/ControlledSelect';
import { Area } from 'core/models/Area';
import { plans } from 'core/models/enums/PlanType';
import { EventAreaPost, EventRoomPost, EventSessionPost } from 'core/models/EventPost';
import { DetailedRoomResponse, Room, RoomsPaged } from 'core/models/Room';
import { SessionWithPlaceFormState } from 'core/models/Session';
import { makePrivateRequest } from 'core/utils/request';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import SessionTable from '../SessionTable';
import SelectTable, { TableRowFormat } from './components/SelectTable';
import './styles.scss';

export interface WithPlaceProps {
  sessions: EventSessionPost[];
  setSessions: (sessions: EventSessionPost[]) => void;
}

const WithPlace = ({ sessions, setSessions }: WithPlaceProps) => {

  const { handleSubmit, formState: { errors }, control, getValues, reset, setValue } = useForm<SessionWithPlaceFormState>();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);
  const [isLoadingPlans] = useState(false);
  const [tableRows, setTableRows] = useState<TableRowFormat[]>([]);

  const [selectedRows, setSelectedRows] = useState<number[]>([]);


  useEffect(() => {
    setIsLoadingRooms(true);
    makePrivateRequest<RoomsPaged>({ url: '/room/all' }).then(response => {
      setRooms(response.data.rooms);
    }).catch(() => {
      toast.error('Erro ao buscar salas.');
    }).finally(() => {
      setIsLoadingRooms(false);
    });
  }, []);

  const handleChangeRoom = (value: string) => {
    const roomId = Number(value);
    // setValue('rows', []);
    // setTableRows([]);

    if (roomId > 0) {
      setIsLoadingRooms(true);
      makePrivateRequest<DetailedRoomResponse>({ url: `/room/${roomId}` })
        .then(({ data: { entity } }) => {
          setTableRows(buildTableModel(entity.areas));
        }).catch(() => {
          const msg = `Erro ao buscar sala.`;
          toast.error(msg);
        }).finally(() => {
          setIsLoadingRooms(false);
        });
    }
  }

  const buildTableModel = (areas: Area[]): TableRowFormat[] => {
    const models: TableRowFormat[] = [];

    for (const area of areas) {
      for (const row of area.rows) {
        models.push({
          id: row.id,
          row: row.name,
          areaId: area.id,
          area: area.name,
          quantity: row.number_accents
        });
      }
    }

    return models;
  }

  const formToSession = (formState: SessionWithPlaceFormState): EventSessionPost => {

    const momentDate: Date = moment(`${formState.date} ${formState.time}`, 'YYYY-MM-DD HH:mm').toDate();

    let ticketsQtd = 0;

    const areas: EventAreaPost[] = [];
    formState.rows.forEach(rowId => {
      const row = tableRows.find(val => val.id === rowId);

      if (row) {
        ticketsQtd += row.quantity;

        areas.push({
          id_area: row?.areaId,
          rows: [row?.id],
        });
      }
    });

    const room: EventRoomPost = {
      id: formState.roomId,
      areas
    };

    const eventSessionPost: EventSessionPost = {
      id: formState.id,
      id_plan: formState.planId,
      moment: momentDate,
      quantity_tickets: ticketsQtd,
      room,
      ticket_type: formState.planId
    };

    return eventSessionPost;
  };

  const onSubmit = (formState: SessionWithPlaceFormState) => {
    if (!formState?.id) {
      const eventSessionPost = formToSession(formState);
      eventSessionPost.id = new Date().getTime()
      setSessions([...sessions, eventSessionPost]);
    } else {
      const index = sessions.findIndex(session => Number(session.id) === Number(formState.id));
      sessions[index] = formToSession(formState);
    }

    reset();
    setTableRows([]);
  };

  const getRoomName = (room: EventRoomPost | string): string => {
    if (typeof room === 'string') return room;

    const roomName = rooms.find(({ id }) => Number(id) === Number(room.id))?.name;
    if (roomName) return roomName;

    return '';
  };

  const handleSessionEdit = (sessionId: number) => {
    const session = sessions.find(session => Number(session.id) === Number(sessionId));

    let time = '';
    let date = '';

    if (session?.moment) {
      time = moment(session.moment).format('HH:mm');
      date = moment(session.moment).format('YYYY-MM-DD');
    }

    let roomId = 0;
    const rows: number[] = [];

    if(session?.room && typeof session.room !== 'string') {
      if(session?.room?.id) roomId = session.room.id;

      session.room.areas.forEach(area => rows.push(...area.rows));
    }

    console.log({rows});

    setValue('id', session?.id || 0);
    setValue('date', date);
    setValue('planId', session?.id_plan || 0);
    setValue('roomId', roomId);
    setValue('rows', rows);
    handleChangeRoom(roomId.toString());
    setValue('time', time);
  }

  useEffect(() => {
    console.log(getValues('rows'));
  }, [setValue])

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
            {isLoadingRooms && (
              <Spinner className="ml-2" animation="border" size="sm" />
            )}
            <ControlledSelect
              name="roomId"
              control={control}
              errors={errors}
              values={rooms.map(room => ({ key: room.id, value: room.name }))}
              rules={{
                required: 'Campo obrigatório',
                validate: () => Number(getValues('roomId')) !== Number(-1) || 'Campo obrigatório'
              }}
              onChange={handleChangeRoom}
            />
          </Form.Group>

          <Form.Group as={Col} sm="3">
            <Form.Label>Plano<i className="text-danger">*</i></Form.Label>
            {isLoadingPlans && (
              <Spinner className="ml-2" animation="border" size="sm" />
            )}
            <ControlledSelect
              name="planId"
              control={control}
              errors={errors}
              values={plans.map(plan => ({ key: plan.id, value: plan.name }))}
              rules={{
                required: 'Campo obrigatório',
                validate: () => Number(getValues('planId')) !== Number(-1) || 'Campo obrigatório'
              }}
            />
          </Form.Group>
        </Row>
        <SelectTable
          seats={tableRows}
          selectedSeats={getValues('rows')}
          setSelectedSeats={(data) => setValue('rows', data)}
        />
        <Row className="justify-content-end">
          <Col sm="2">
            <Button
              type="submit"
              className="button"
              variant="secondary"
            >Adicionar sessão</Button>
          </Col>
        </Row>


        {/* <StandardTable sessions={[]} plans={[]} handleDelete={console.log} handleEdit={console.log} /> */}
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


export default WithPlace;

import ControlledSelect from 'core/components/ControlledSelect';
import { Area } from 'core/models/Area';
import { plans } from 'core/models/enums/PlanType';
import { SessionWithPlace } from 'core/models/Event';
import { DetailedRoomResponse, Room, RoomsPaged } from 'core/models/Room';
import { Seat } from 'core/models/Seat';
import { SessionWithPlaceFormState } from 'core/models/Session';
import { makePrivateRequest } from 'core/utils/request';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import StandardTable from '../Table';
import SeatTable from './components/SeatTable';
import SelectTable, { TableRowFormat } from './components/SelectTable';
import './styles.scss';

const WithPlace = () => {

  const { handleSubmit, formState: { errors }, control, getValues, reset, setValue } = useForm<SessionWithPlaceFormState>();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);
  const [isLoadingPlans ] = useState(false);
  const [seats, setSeats] = useState<Seat[]>([]);
  
  const [tableSeats, setTableSeats] = useState<Seat[]>([]);

  const [model, setModel] = useState<TableRowFormat[]>([]);

  useEffect(() => {
    setIsLoadingRooms(true);
    makePrivateRequest<RoomsPaged>({ url: '/room/many' }).then(response => {
      setRooms(response.data.rooms);
    }).catch(() => {
      toast.error('Erro ao buscar salas.');
    }).finally(() => {
      setIsLoadingRooms(false);
    });
  }, []);

  const onChangeRoom = (value: string) => {
    const roomId = Number(value);
    setValue('rows', []);
    setTableSeats([]);

    if (roomId > 0) {
      setIsLoadingRooms(true);
      makePrivateRequest<DetailedRoomResponse>({ url: `/room/${roomId}` })
        .then(({data: {entity}}) => {         
          setModel(buildTableModel(entity.areas));
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
          area: area.name,
          quantity: row.number_accents
        });
      }
    }

    return models;
  }

  const onSubmit = (formState: SessionWithPlaceFormState) => {
    console.log(formState);

    // if (!formState?.id) {
    //   const session: SessionWithPlace = formToSession(formState);
    //   session.id = new Date().getTime()
    //   setSessions([...sessions, session]);
    // } else {
    //   const index = sessions.findIndex(session => Number(session.id) === Number(formState.id));
    //   sessions[index] = formToSession(formState);
    // }

    // reset();
  }

  // const formToSession = (formState: SessionWithPlaceFormState): SessionWithPlace => {
  //   const seats: number[] = [];
  //   for (const seat of formState.seats) {
  //     if (seat.id) {
  //       // seats.push(seat);
  //     }
  //   }

  //   const roomName = rooms.find(room => Number(room.id) === Number(formState.roomId))?.name;

  //   const momentDate: Date = moment(`${formState.date} ${formState.time}`, 'YYYY-MM-DD HH:mm').toDate();
  //   return {
  //     id: formState.id,
  //     id_plan: formState.planId,
  //     moment: momentDate,
  //     quantity_tickets: formState.ticketsQtd,
  //     room: {
  //       id: formState.roomId,
  //       // name: 
  //       seats
  //     },
  //     ticket_type: formState.planId,
  //   }
  // }

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
              onChange={onChangeRoom}
            />
          </Form.Group>

          {/* <Col sm={3}>
            <Form.Group>
              <Form.Label>Assentos<i className="text-danger">*</i></Form.Label>
              <Controller
                name="seats"
                control={control}
                render={({ field, fieldState, formState }) =>
                  <>
                    <Select
                      {...field}
                      {...fieldState}
                      {...formState}
                      onChange={(value, action) => {
                        setTableSeats(value as Seat[]);
                        field.onChange(value, action);
                      }}
                      closeMenuOnSelect={false}
                      options={seats || []}
                      getOptionValue={op => String(op.id)}
                      getOptionLabel={op => `Área: ${op.area} - Fileira: ${op.row}`}
                      isMulti
                      isDisabled={!getValues('roomId') || getValues('roomId') <= 0}
                    />
                  </>
                }
              />
            </Form.Group>
          </Col> */}


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
          {tableSeats?.length && <SeatTable seats={tableSeats} />}
        </Row>
        <SelectTable
          seats={model}
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


        <StandardTable sessions={[]} plans={[]} handleDelete={console.log} handleEdit={console.log} />
      </Form>
    </div>
  );
}


export default WithPlace;

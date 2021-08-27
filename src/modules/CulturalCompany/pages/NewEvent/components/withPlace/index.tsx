import './styles.scss';

import ControlledFormControl from 'core/components/ControlledFormControl';
import ControlledSelect from 'core/components/ControlledSelect';
import { plans } from 'core/models/enums/PlanType';
import { Room, RoomsPaged } from 'core/models/Room';
import { Seat } from 'core/models/Seat';
import { makePrivateRequest } from 'core/utils/request';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Spinner, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import StandardTable from '../Table';
import { SessionWithPlaceFormState } from 'core/models/Session';

const WithPlace = () => {

  const { handleSubmit, formState: { errors }, control, getValues, reset, setValue } = useForm<SessionWithPlaceFormState>();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);
  const [seats, setSeats] = useState<Seat[]>();

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

  const onChangeRoom = (ev: any) => {
    console.log(ev);
  }

  const onSubmit = () => {

  }

  return (
    <div className="mt-5">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Form.Group as={Col} sm="3">
            <Form.Label>Data<i className="text-danger">*</i></Form.Label>
            <ControlledFormControl
              name="date"
              control={control}
              errors={errors}
              rules={{
                required: 'Campo obrigatório'
              }}
              type="date"
            />
          </Form.Group>

          <Form.Group as={Col} sm="3">
            <Form.Label>Horário<i className="text-danger">*</i></Form.Label>
            <ControlledFormControl
              name="time"
              control={control}
              errors={errors}
              rules={{
                required: 'Campo obrigatório'
              }}
              type="time"
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

          <Form.Group as={Col} sm="3">
            <Form.Label>Plano<i className="text-danger">*</i></Form.Label>
            {isLoadingRooms && (
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

        <Row>
          <Table responsive className="table" >
            <thead className="tableHeader">
              <tr>
                <th>Área</th>
                <th>Fileira</th>
                <th>Qtd. assentos</th>
                <th>
                  <Form.Check />
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 3 }).map((_, index) => (
                <tr>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <td key={index}>Table cell {index}</td>
                  ))}
                  <td>
                    <Form.Check />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
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

        <StandardTable sessions={[]} plans={[]} handleDelete={console.log} handleEdit={console.log} />
      </Form>
    </div>
  );
}


export default WithPlace;

import './styles.scss';

import ControlledFormControl from 'core/components/ControlledFormControl';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Seat } from 'core/models/Seat';
import SeatTable from '../SeatTable';
import SelectTable from 'modules/CulturalCompany/pages/NewEvent/components/WithPlace/components/SelectTable';

interface FormState {
  id?: number;
  area: string;
  row: number;
  quantity: number;
}

interface Props {
  // seats: Seat[];
  seats: any[];
  setSeats: (seats: Seat[]) => void;
}

const SeatForm = ({ seats, setSeats }: Props) => {
  const { handleSubmit, formState: { errors }, control, setValue, reset } = useForm();
  // const { handleSubmit, formState: { errors }, control, setValue, reset } = useForm<FormState>();

  const onSubmit = (formState: FormState) => {
    if (!formState?.id) {
      const seat: Seat = formToSeat(formState);
      seat.id = new Date().getTime()
      setSeats([...seats, seat]);
    } else {
      console.log('edit');
     const index = seats.findIndex(seat => Number(seat.id) === Number(formState.id));
     seats[index] = formToSeat(formState);
    }

    reset();
  }

  const handleSeatDelete = (seat: number) => {
    const s: Seat[] = seats.slice();
    const index = s.findIndex(session => Number(session.id) === Number(seat));
    s.splice(index, 1);
    setSeats(s);
  }

  const handleSeatEdit = (seatId: number) => {
    const seat = seats.find(seat => Number(seat.id) === Number(seatId));
    setValue('id', seat?.id);
    setValue('area', seat?.area || '');
    setValue('row', seat?.row || 0);
    setValue('quantity', seat?.quantity || 0);
  }

  const formToSeat = (formState: FormState) => {
    const seat: Seat = {
      ...formState
    } as any
    return seat;
  }

  return (
    <>
      <h6 className="room-title">Assentos</h6>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Form.Group as={Col} sm="4">
            <Form.Label>Área<i className="text-danger">*</i></Form.Label>
            <ControlledFormControl
              name="area"
              control={control}
              errors={errors}
              rules={{
                required: 'Campo obrigatório'
              }}
            />
          </Form.Group>

          <Form.Group as={Col} sm="4">
            <Form.Label>Fileira<i className="text-danger">*</i></Form.Label>
            <ControlledFormControl
              name="row"
              control={control}
              errors={errors}
              rules={{
                required: 'Campo obrigatório'
              }}
              type="number"
            />
          </Form.Group>

          <Form.Group as={Col} sm="4">
            <Form.Label>Qtd. Assentos<i className="text-danger">*</i></Form.Label>
            <ControlledFormControl
              name="quantity"
              control={control}
              errors={errors}
              rules={{
                required: 'Campo obrigatório'
              }}
              type="number"
            />
          </Form.Group>
        </Row>

        <Row className="justify-content-end">
          <Col sm="2">
            <Button
              type="submit"
              className="button mt-3"
              variant="orange-1"
            >Adicionar sala</Button>
          </Col>
        </Row>
      </Form>

      <SeatTable
        seats={seats}
        handleDelete={handleSeatDelete}
        handleEdit={handleSeatEdit}
      />
    </>
  );
}

export default SeatForm;

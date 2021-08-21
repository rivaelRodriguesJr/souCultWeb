import './styles.scss';

import ControlledFormControl from 'core/components/ControlledFormControl';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Seat } from 'core/models/Seat';
import { useState } from 'react';

interface FormState {
  area: string;
  row: number;
  quantity: number;

}

interface Props {
  submitSeat: (seat: Seat) => void;
  seat?: Seat;
}


const SeatForm = ({submitSeat, seat}: Props) => {
  const { handleSubmit, formState: { errors }, control, getValues, setValue, reset } = useForm<FormState>();

  const onSubmit = ({ area, row, quantity }: FormState) => {
    const id = seat?.id || new Date().getTime();
    submitSeat({ id, area, row, quantity });
    reset();
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
              variant="secondary"
            >Adicionar sala</Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default SeatForm;

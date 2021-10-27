import Area from 'core/models/Area';
import { ReactElement } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import AreaTable from '../AreaTable';
import './styles.scss';


export interface AreaFormState {
  id: number;
  area: string;
  row: string;
  quantity: number;
}

export interface AreaFormProps {
  areas: Area[];
  setAreas: (areas: Area[]) => void;
}

const AreaForm = ({ areas, setAreas }: AreaFormProps): ReactElement => {
  const { handleSubmit, formState: { errors }, control, setValue, reset } = useForm<AreaFormState>();
  // const { handleSubmit, formState: { errors }, control, setValue, reset } = useForm<FormState>();

  const onSubmit = (formState: AreaFormState) => {
    if (!formState?.id) {
      const area: Area = fromFormState(formState);
      area.id = new Date().getTime()
      setAreas([...areas, area]);
    } else {
     const index = areas.findIndex(seat => Number(seat.id) === Number(formState.id));
     areas[index] = fromFormState(formState);
    }

    reset();
  }

  const handleAreaDelete = (seat: number) => {
    const a: Area[] = areas.slice();
    const index = a.findIndex(session => Number(session.id) === Number(seat));
    a.splice(index, 1);
    setAreas(a);
  }

  const handleAreaEdit = (seatId: number) => {
      const area = areas.find(seat => Number(seat.id) === Number(seatId));
      setValue('id', area?.id || 0);
      setValue('area', area?.name || '');
      setValue('row', area?.rows[0].name || '');
      setValue('quantity', area?.rows[0].number_accents || 0);
  }

  const fromFormState = (formState: AreaFormState): Area => {
    const area: Area = {
      id: formState.id,
      name: formState.area,
      rows: [{
        id: 0,
        name: formState.row,
        number_accents: formState.quantity
      }],
    };
    return area;
  }

  return (
    <>
      <h6 className="room-title">Assentos</h6>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Form.Group as={Col} sm="4">
            <Form.Label>Área<i className="text-danger">*</i></Form.Label>
            <Controller
              name="area"
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

          <Form.Group as={Col} sm="4">
            <Form.Label>Fileira<i className="text-danger">*</i></Form.Label>
            <Controller
              name="row"
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

          <Form.Group as={Col} sm="4">
            <Form.Label>Qtd. Assentos<i className="text-danger">*</i></Form.Label>
            <Controller
              name="quantity"
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
                required: 'Campo obrigatório'
              }}
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

      <AreaTable
        areaTableRows={areas.map(area => {
          return {
            id: area.id,
            area: area.name,
            row: area.rows[0].name,
            seatsQtd: area.rows[0].number_accents,
          };
        })}
        handleDelete={handleAreaDelete}
        handleEdit={handleAreaEdit}
      />
    </>
  );
}

export default AreaForm;

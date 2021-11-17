import { stateMock } from 'core/models/mocks/StateMock';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from "react-hook-form";
import './styles.scss';

export interface EventFilterFormState {
  nameEvent?: string;
  status?: number;
  city?: string;
  state?: string;
}

interface FilterProps {
  onSubmit: (data: EventFilterFormState) => void;
}

const statusList: { id: number, name: string }[] = [
  { id: 1, name: 'Ativo' },
  { id: 2, name: 'Esgotado' },
  { id: 3, name: 'Cancelado' }
]

const Filter = ({ onSubmit }: FilterProps) => {
  // const { handleSubmit, formState: { errors }, control, getValues, setValue, } = useForm<FormState>();
  const { handleSubmit, formState: { errors }, control, getValues, reset } = useForm<EventFilterFormState>();



  return (
    <div className="filter-container">
      <Form className="filter py-4" onSubmit={handleSubmit(onSubmit)}>
        <Row>

          <Col sm="4">
            <Form.Group>
              <Form.Label>Novo evento</Form.Label>
              <Controller
                name="nameEvent"
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
                }}
              />
            </Form.Group>
          </Col>

          <Col sm="4">
            <Form.Group>
              <Form.Label>Estado</Form.Label>
              <Controller
                name="state"
                control={control}
                render={({ field, fieldState }) =>
                  <>
                    <Form.Control
                      as="select"
                      isInvalid={fieldState.invalid}
                      {...field}
                    >
                      <option value={-1}>Selecione</option>
                      {stateMock.map(state => (
                        <option key={state.abbreviation} value={state.abbreviation}>{state.abbreviation}</option>
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
                  validate: () => Number(getValues('state')) !== Number(-1) || 'Campo obrigatório'
                }}
              />
            </Form.Group>
          </Col>

          <Col sm="4">
            <Form.Group>
              <Form.Label>Cidade</Form.Label>
              <Controller
                name="city"
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
                }}
              />
            </Form.Group>
          </Col>

          <Col sm="4">
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Controller
                name="status"
                control={control}
                render={({ field, fieldState }) =>
                  <>
                    <Form.Control
                      as="select"
                      isInvalid={fieldState.invalid}
                      {...field}
                    >
                      <option value={-1}>Selecione</option>
                      {statusList.map(status => (
                        <option key={status.id} value={status.id}>{status.name}</option>
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
                  validate: () => Number(getValues('state')) !== Number(-1) || 'Campo obrigatório'
                }}
              />
            </Form.Group>
          </Col>

        </Row>

        <Row className="justify-content-end">
          <Col sm="2">
            <Button 
              type="button"
              className="button"
              variant="orange-3"
              onClick={() => {
                reset();
                onSubmit({});
              }}
            >Limpar</Button>
          </Col>
          <Col sm="2">
            <Button type="submit" className="button" variant="sea-blue-1">Buscar</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default Filter;
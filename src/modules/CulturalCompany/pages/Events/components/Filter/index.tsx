import { stateMock } from 'core/models/mocks/StateMock';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from "react-hook-form";
import './styles.scss';

interface FormState {
  name: string;
  status_id: number;
  city: string;
  state: string;
}

const statusList: {id: number, name: string}[] = [
  {id: 1, name: 'Ativo'},
  {id: 2, name: 'Esgotado'},
  {id: 3, name: 'Cancelado'}
] 

const Filter = () => {
  const { handleSubmit, formState: { errors }, control, getValues, setValue, } = useForm<FormState>();

  return (
    <div className="filter-container">
      {/* <Form className="filter">
        <Form.Group as={Row} className="row filter-row">
          <Form.Label column sm="2">
            Novo evento:
          </Form.Label>
          <Col sm="3">
            <Form.Control type="text" />
          </Col>

          <Form.Label column sm="1">
            Estado:
          </Form.Label>
          <Col sm="2">
            <Form.Control as="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Col>

          <Form.Label column sm="2">
            Cidade:
          </Form.Label>
          <Col sm="2">
            <Form.Control type="text" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="row filter-row">
          <Form.Label column sm="2">
            Status:
          </Form.Label>
          <Col sm="2">
            <Form.Control as="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Col>
          <Col sm="2" />
          <Col sm="2" />
          <Col sm="2">
            <Button className="button" variant="sea-blue-1">Buscar</Button>
          </Col>
          <Col sm="2">
            <Button className="button" variant="orange-3">Limpar</Button>
          </Col>
        </Form.Group>
      </Form> */}

      <Form className="filter py-4">
        <Row>

          <Col sm="4">
            <Form.Group>
              <Form.Label>Novo evento</Form.Label>
              <Controller
                name="name"
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
                  required: 'Campo obrigatório',
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
                  required: 'Campo obrigatório'
                }}
              />
            </Form.Group>
          </Col>

          <Col sm="4">
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Controller
                name="status_id"
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
                  required: 'Campo obrigatório',
                  validate: () => Number(getValues('state')) !== Number(-1) || 'Campo obrigatório'
                }}
              />
            </Form.Group>
          </Col>

        </Row>

        <Row className="justify-content-end">
          <Col sm="2">
            <Button type="button" className="button" variant="orange-3">Limpar</Button>
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
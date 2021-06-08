import BaseContainer from "core/components/BaseContainer";
import { DetailedEvent, Session } from "core/models/Event";
import { makePrivateRequest } from "core/utils/request";
import React from "react";
import { Col, Form, Row, Tab, TabContainer, TabContent, Tabs } from 'react-bootstrap';
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import WithoutPlace from './components/withoutPlace';
import WithPlace from './components/withPlace';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';


import './styles.scss';

interface FormState {
  name: string;
  description: string;

  category_id: number;

  street_numbering: string;
  zip_code: string;
  city: string;
  state: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

const NewEvent = () => {
  const { handleSubmit, formState: { errors }, control, getValues } = useForm<FormState>();
  const [eventCategories, setEventCategories] = React.useState<{id: number, name: string}[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const history = useHistory();
  const classes = useStyles();


  React.useEffect(() => {
    setEventCategories([
      {id: 1, name: 'Categoria 1'},
      {id: 2, name: 'Categoria 2'},
      {id: 3, name: 'Categoria 3'},
      {id: 4, name: 'Categoria 4'},
      {id: 5, name: 'Categoria 5'}
    ])
  }, []);

  React.useEffect(() => {
    console.log(getValues());
  }, [getValues])


  const onSubmit = (session: Session[]) => {
    const event: DetailedEvent = {
      address: {
        city: getValues('city'),
        state: getValues('state'),
        street_numbering: getValues('street_numbering'),
        zip_code: getValues('zip_code')
      },
      description: getValues('description'),
      name: getValues('name'),
      session,
      status_id: 1
    };

    setIsLoading(true);
    makePrivateRequest({
      method: 'POST',
      url: '/event',
      data: event
    }).then(() => {
      const msg = `Evento salvo com sucesso.`;
      toast.info(msg);
      history.goBack();
    }).catch(() => {
      const msg = `Erro ao salvar evento.`;
      toast.error(msg);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  return (
    <>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="primary" />
      </Backdrop>
      <BaseContainer title="Novo Evento">
        <div className="general">
          <h5>Geral</h5>
          <Form className="form" onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm="6">
                <Form.Group>
                  <Form.Label>Novo evento<i className="text-danger">*</i></Form.Label>
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

              <Col sm="6">
                <Form.Group>
                  <Form.Label>Edereço<i className="text-danger">*</i></Form.Label>
                  <Controller
                    name="street_numbering"
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
                  <Form.Label>CEP<i className="text-danger">*</i></Form.Label>
                  <Controller
                    name="zip_code"
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
                  <Form.Label>Cidade<i className="text-danger">*</i></Form.Label>
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
                  <Form.Label>Estado<i className="text-danger">*</i></Form.Label>
                  <Controller
                    name="state"
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

              <Col sm="8">
                <Form.Group>
                  <Form.Label>Descrição do evento<i className="text-danger">*</i></Form.Label>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field, fieldState }) =>
                      <>
                        <Form.Control
                          as="textarea"
                          rows={3}
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
                  <Form.Label>Categoria<i className="text-danger">*</i></Form.Label>
                  <Controller
                    name="category_id"
                    control={control}
                    render={({ field, fieldState }) =>
                      <>
                        <Form.Control
                          as="select"
                          isInvalid={fieldState.invalid}
                          {...field}
                        >
                          <option value={-1}>Selecione</option>
                          {eventCategories.map(eventCategory => (
                            <option key={eventCategory.id} value={eventCategory.id}>{eventCategory.name}</option>
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
                      validate: () => Number(getValues('category_id')) !== Number(-1) || 'Campo obrigatório'
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* <Form.Group as={Row} className="row">
              <Form.Label column sm="2">
                Novo evento:
                </Form.Label>
              <Col sm="4">
              <Form.Control type="text" />
              </Col>

              <Form.Label column sm="2">
                Endereço:
                </Form.Label>
              <Col sm="4">
                <Form.Control type="text" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="row">
              <Form.Label column sm="2">
                CEP:
                </Form.Label>
              <Col sm="2">
                <Form.Control type="text" />
              </Col>

              <Form.Label column sm="2">
                Cidade:
                </Form.Label>
              <Col sm="2">
                <Form.Control type="text" />
              </Col>

              <Form.Label column sm="2">
                Estado:
                </Form.Label>
              <Col sm="2">
                <Form.Control type="text" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="row">
              <Form.Label column sm="2">
                Descrição do evento:
                </Form.Label>
              <Col sm="6">
                <Form.Control as="textarea" rows={3} />
              </Col>

              <Form.Label column sm="2">
                Categoria:
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
            </Form.Group> */}
          </Form>
          <hr className="base-container-divider" />
        </div>

        <div className="session">
          <h5>Sessões e ingressos</h5>
          <Tabs defaultActiveKey="semLugar" id="uncontrolled-tab-example">
            <Tab eventKey="semLugar" title="Sem lugar marcado">
              <TabContainer>
                <TabContent>
                  <WithoutPlace submit={onSubmit}></WithoutPlace>
                </TabContent>
              </TabContainer>
            </Tab>
            <Tab eventKey="comLugar" title="Com lugar marcado">
              <WithPlace></WithPlace>
            </Tab>
          </Tabs>
        </div>
      </BaseContainer>
    </>
  );
  // }
}

export default NewEvent;

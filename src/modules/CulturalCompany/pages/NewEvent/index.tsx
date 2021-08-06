import BackdropLoader from 'core/components/BackdropLoader';
import BaseContainer from "core/components/BaseContainer";
import { EventCategory, EventCategoriesRequest } from 'core/models/enums/EventCategory';
import { DetailedEvent, DetailedEventRequest, Session } from "core/models/Event";
import { stateMock } from 'core/models/mocks/StateMock';
import { makePrivateRequest } from "core/utils/request";
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Spinner, Tab, TabContainer, TabContent, Tabs } from 'react-bootstrap';
import { Controller, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ImageUpload from './components/ImageUpload';
import WithoutPlace from './components/WithoutPlace';
import WithPlace from './components/withPlace';
import './styles.scss';

interface FormState {
  name: string;
  description: string;
  event_category_id: number;
  street_numbering: string;
  zip_code: string;
  city: string;
  state: string;
}

interface Params {
  eventId: string;
}

const NewEvent = () => {
  const { handleSubmit, formState: { errors }, control, getValues, setValue,  } = useForm<FormState>();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { eventId } = useParams<Params>();

  const [sessions, setSessions] = useState<Session[]>([]);
  const [uploadedImgUrl, setUploadedImgUrl] = useState('');
  const [eventCategories, setEventCategories] = useState<EventCategory[]>([]);
  const [isLoadingEventCategories, setIsLoadingEventCategories] = useState(false);


  const isEditing = eventId !== 'create';
 
  useEffect(() => {
    if (isEditing) {
      setIsLoading(true);
      makePrivateRequest<DetailedEventRequest>({ url: `/event/${eventId}` })
        .then(response => {
          const { result } = response.data;
          setValue('name', result.name);
          setValue('city', result.address.city);
          setValue('description', result.description);
          setValue('state', result.address.state);
          setValue('street_numbering', result.address.street_numbering);
          setValue('zip_code', result.address.zip_code);
          setValue('event_category_id', result.category.id);
          setSessions(result.sessions || []);
        }).catch(() => {
          const msg = `Erro ao buscar evento.`;
          toast.error(msg);
          history.goBack();
        }).finally(() => {
          setIsLoading(false);
        });
    }
  }, [eventId, isEditing, history, setValue]);

  useEffect(() => {
    setIsLoadingEventCategories(true);
    makePrivateRequest<EventCategoriesRequest>({ url: '/eventCategories' })
      .then(({data}) => {
        setEventCategories(data.result);
      })
      .catch(() => {
        toast.error('Erro ao buscar categorias');
      })
      .finally(() => {
        setIsLoadingEventCategories(false);
      });
  }, []);

  const onSubmit = () => {
    const event: DetailedEvent = {
      address: {
        city: getValues('city'),
        state: getValues('state'),
        street_numbering: getValues('street_numbering'),
        zip_code: getValues('zip_code')
      },
      description: getValues('description'),
      name: getValues('name'),
      sessions,
      status_id: 1,
      event_category_id: getValues('event_category_id'),
      banner_link: uploadedImgUrl
    };

    setIsLoading(true);
    makePrivateRequest({
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/event/${eventId}` : '/event',
      data: event
    }).then(() => {
      const msg = `Evento ${isEditing ? 'alterado' : 'salvo'} com sucesso!`;
      toast.info(msg);
      history.goBack();
    }).catch(() => {
      const msg = `Erro ao ${isEditing ? 'alterar' : 'salvar'} evento!`;
      toast.error(msg);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  const onUploadSuccess = (imgUrl: string) => {
    setUploadedImgUrl(imgUrl);
  }

  return (
    <>
      <BackdropLoader isLoading={isLoading} />
      <BaseContainer title={`${isEditing ? 'Editar' : 'Novo'} Evento`}>
        <div className="general">
          <h5>Geral</h5>
          <Form className="form">
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
                  <Form.Label>Endereço<i className="text-danger">*</i></Form.Label>
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

              <Col sm="12">
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
                  {isLoadingEventCategories && (
                    <Spinner className="ml-2" animation="border" size="sm" />
                  )}
                  
                  <Controller
                    name="event_category_id"
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
                      validate: () => Number(getValues('event_category_id')) !== Number(-1) || 'Campo obrigatório'
                    }}
                  />
                </Form.Group>
              </Col>

              <Col sm="6">
                <Form.Group style={{marginTop: '1.75rem'}}>
                  {/* <Form.Label>Baner<i className="text-danger">*</i></Form.Label> */}
                  <ImageUpload onUploadSuccess={onUploadSuccess} />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </div>

        <hr className="base-container-divider" />

        <div className="session">
          <h5>Sessões e ingressos</h5>
          <Tabs defaultActiveKey="semLugar" id="uncontrolled-tab-example">
            <Tab eventKey="semLugar" title="Sem lugar marcado">
              <TabContainer>
                <TabContent>
                  <WithoutPlace 
                    sessions={sessions}
                    setSessions={setSessions}
                  />
                </TabContent>
              </TabContainer>
            </Tab>
            <Tab eventKey="comLugar" title="Com lugar marcado">
              <WithPlace />
            </Tab>
          </Tabs>
        </div>

        <Row className="justify-content-end">
          <Col sm="2">
            <Button
              type="button"
              className="button"
              variant="secondary"
              onClick={() => history.goBack()}
            >Voltar</Button>
          </Col>
          <Col sm="2">
            <Button
              type="button"
              className="button"
              variant="sea-blue-1"
              onClick={() => handleSubmit(onSubmit)()}
            >{`${isEditing ? 'Editar' : 'Criar'} evento`}</Button>
          </Col>
        </Row>
      </BaseContainer>
    </>
  );
}

export default NewEvent;

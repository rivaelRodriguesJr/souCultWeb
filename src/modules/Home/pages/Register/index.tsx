import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import './styles.scss';

interface FormState {
  company: string;
  cnpj: string;
  cep: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  responsableName: string;
  companyType: number;
}


const Register = () => {

  const { handleSubmit, formState: { errors }, control, getValues, setValue, } = useForm<FormState>();


  return (
    <>
      <div className="registerContainer">
        <h5>Requisição de cadastro</h5>

        <Form className="form">
          <Row>
            <Col sm="12">
              <Controller
                name="companyType"
                control={control}
                render={({ field, fieldState }) =>
                  <>
                    <Form.Check
                      inline
                      label="Quero oferecer meus serviços dentro do grupo de convênio"
                      type="radio"
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

              <Controller
                name="companyType"
                control={control}
                render={({ field, fieldState }) =>
                  <>
                    <Form.Check
                      inline
                      label="Quero oferecer o convênio aos meus colaboradores"
                      type="radio"
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
              <Form.Check
                inline
                label="Quero oferecer o convênio aos meus colaboradores"
                name="group1"
                type="radio"
              />

            </ Col>
            <Col sm="6">
              <Form.Group>
                <Form.Label>Empresa<i className="text-danger">*</i></Form.Label>
                <Controller
                  name="company"
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
                <Form.Label>CNPJ<i className="text-danger">*</i></Form.Label>
                <Controller
                  name="cnpj"
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
                <Form.Label>CEP<i className="text-danger">*</i></Form.Label>
                <Controller
                  name="cep"
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

            <Col sm="6">
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

            <Col sm="6">
              <Form.Group>
                <Form.Label>Telefone<i className="text-danger">*</i></Form.Label>
                <Controller
                  name="phone"
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
                <Form.Label>E-mail<i className="text-danger">*</i></Form.Label>
                <Controller
                  name="email"
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
                <Form.Label>Responsável<i className="text-danger">*</i></Form.Label>
                <Controller
                  name="responsableName"
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

          </Row>
        </Form>



        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control type="password" placeholder="Password" />
          </Col>
        </Form.Group>


        <Form className="form">

          <Row className="registerRow">
            <Form.Label column sm="2">
              Empresa:
            </Form.Label>
            <Col sm="4">
              <Form.Control type="text" />
            </Col>
            <Form.Label column sm="2">
              CNPJ:
            </Form.Label>
            <Col sm="4">
              <Form.Control type="text" />
            </Col>
          </Row>
          <Row className="registerRow">
            <Form.Label column sm="2">
              CEP:
            </Form.Label>
            <Col sm="4">
              <Form.Control type="text" />
            </Col>
            <Form.Label column sm="2">
              Cidade:
            </Form.Label>
            <Col sm="4">
              <Form.Control type="text" />
            </Col>
          </Row>
          <Row className="registerRow">
            <Form.Label column sm="2">
              Estado:
            </Form.Label>
            <Col sm="4">
              <Form.Control type="text" />
            </Col>
            <Form.Label column sm="2">
              Telefone:
            </Form.Label>
            <Col sm="4">
              <Form.Control type="text" />
            </Col>
          </Row>
          <Row className="registerRow">
            <Form.Label column sm="2">
              E-mail:
            </Form.Label>
            <Col sm="4">
              <Form.Control type="text" />
            </Col>
            <Form.Label column sm="2">
              Responsável:
            </Form.Label>
            <Col sm="4">
              <Form.Control type="text" />
            </Col>
          </Row>
          <Col sm="6">
            <Button className="registerButton" variant="sea-blue-1">Requisitar cadastro</Button>
          </Col>
        </Form>

      </div>
    </>
  );
}

export default Register;
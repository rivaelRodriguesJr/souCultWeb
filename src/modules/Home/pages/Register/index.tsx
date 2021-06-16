import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import './styles.scss';


class Register extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {

    }
  };

  render() {
    return (
      <>
        <div className="registerContainer">
          <h5>Requisição de cadastro</h5>
          <Form className="form">
            <Form.Group className="row">
              <Row className="registerRow">
                <Col sm="6">
                  <Form.Check type="radio" label="Quero oferecer meus serviços dentro do grupo de convênio" />
                </Col>
                <Col sm="6">
                  <Form.Check type="radio" label="Quero oferecer o convênio aos meus colaboradores" />
                </Col>
              </Row>
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
            </Form.Group>
            <Col sm="6">
              <Button className="registerButton" variant="sea-blue-1">Requisitar cadastro</Button>
            </Col>
          </Form>

        </div>
      </>
    );
  }
}

export default Register;
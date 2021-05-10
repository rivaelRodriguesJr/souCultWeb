import React from "react";
import BaseContainer from "core/components/BaseContainer";
import './styles.scss';
import WithoutPlace from './components/withoutPlace';
import WithPlace from './components/withPlace';
import Table from './components/Table';

import { Form, Row, Col, Button } from 'react-bootstrap';

class NewEvent extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {

    }
  };

  render() {
    return (
      <>
        <BaseContainer title="Novo Evento">
          <div className="general">
            <h5>Geral</h5>
            <Form className="form">
              <Form.Group as={Row} className="row">
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
              </Form.Group>
            </Form>
            <hr className="base-container-divider" />
          </div>

          <div className="session">
            <h5>Sessões e ingressos</h5>
            <Form>
              <Form.Group as={Row} className="row">
                <Form.Label column sm="2">
                  Tipo de ingresso:
                </Form.Label>

                <Col sm="1">
                  <Form.Check type="radio" aria-label="radio 1" />
                </Col>
                <Form.Label column sm="2">
                  Sem lugar marcado
                </Form.Label>

                <Col sm="1">
                  <Form.Check type="radio" aria-label="radio 2" />
                </Col>
                <Form.Label column sm="2">
                  Com lugar marcado
                </Form.Label>
                <WithoutPlace></WithoutPlace>
              </Form.Group>
              <Table></Table>
              <Col sm="2">
                <Button className="button" variant="sea-blue-1">Criar evento</Button>
              </Col>
            </Form>
          </div>
        </BaseContainer>
      </>
    );
  }
}

export default NewEvent;


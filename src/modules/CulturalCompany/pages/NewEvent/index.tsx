import React from "react";
import BaseContainer from "core/components/BaseContainer";
import './styles.scss';
import WithoutPlace from './components/withoutPlace';
import WithPlace from './components/withPlace';

import { Form, Row, Col, Button, Tabs, Tab } from 'react-bootstrap';

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
            <Form className="form">
              <Form.Group as={Row} className="row">
                <Tabs defaultActiveKey="semLugar" id="uncontrolled-tab-example">
                  <Tab eventKey="semLugar" title="Sem lugar marcado">
                    <WithoutPlace></WithoutPlace>
                  </Tab>
                  <Tab eventKey="comLugar" title="Com lugar marcado">
                    <WithPlace></WithPlace>
                  </Tab>
                </Tabs>
              </Form.Group>
            </Form>
          </div>
        </BaseContainer>
      </>
    );
  }
}

export default NewEvent;


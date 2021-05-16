import React, { useEffect, useState } from 'react';
import BaseContainer from "core/components/BaseContainer";
import './styles.scss';
import { Form, Row, Col, Button, Table } from 'react-bootstrap';


class NewRoom extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {

    }
  };

  render() {
    return (
      <>
        <BaseContainer title="NOVA SALA">
          <div>
            <Form className="form">
              <Form.Group as={Row} className="row">
                <Form.Label column sm="2">
                  Novo da sala:
                </Form.Label>
                <Col sm="4">
                  <Form.Control type="text" />
                </Col>

                <Form.Label column sm="2">
                  Imagem da sala:
                </Form.Label>
                <Col sm="2">
                  <Button variant = "gray">importar</Button>
                </Col>
              </Form.Group>

              <h6>Assentos</h6>

              <Form.Group as={Row} className="row">
                <Form.Label column sm="1">
                  Área:
                </Form.Label>
                <Col sm="2">
                  <Form.Control type="text" />
                </Col>

                <Form.Label column sm="1">
                  Fileira:
                </Form.Label>
                <Col sm="2">
                  <Form.Control type="text" />
                </Col>

                <Form.Label column sm="2">
                  Qtd. assentos::
                </Form.Label>
                <Col sm="2">
                  <Form.Control type="number" />
                </Col>
                <Col sm="1">
                  <Button variant = "gray">+</Button>
                </Col>
              </Form.Group>
              <div>
                <Table responsive className="table" >
                  <thead className="tableHeader">
                    <tr>
                      <th>Área</th>
                      <th>Fileira</th>
                      <th>Qtd. Assentos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 3 }).map((_, index) => (
                      <tr>
                        {Array.from({ length: 3 }).map((_, index) => (
                          <td key={index}>Table cell {index}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Col sm="2">
                  <Button className="button" variant="sea-blue-1">Criar sala</Button>
                </Col>
              </div>
            </Form>

          </div>
        </BaseContainer>
      </>
    );
  }
}

export default NewRoom;
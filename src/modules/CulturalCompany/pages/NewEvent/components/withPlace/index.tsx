import React from "react";
import './styles.scss';
import StandardTable from '../Table';
import { Form, Row, Col, Button, Table } from 'react-bootstrap';

class WithPlace extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {

        }
    };

    render() {
        return (
              <>
              <div className="container">
                  <Form>
                      <Form.Group as={Row} className="row">
                          <Form.Label column sm="1">
                              Data:
                          </Form.Label>
                          <Col sm="2">
                              <Form.Control type="date" />
                          </Col>

                          <Form.Label column sm="1">
                              Horario:
                          </Form.Label>
                          <Col sm="2">
                              <Form.Control type="time" />
                          </Col>

                          <Form.Label column sm="1">
                              Sala:
                          </Form.Label>
                          <Col sm="2">
                              <Form.Control type="text" />
                          </Col>

                          <Form.Label column sm="1">
                              Plano:
                          </Form.Label>
                          <Col sm="2">
                              <Form.Control type="text" />
                          </Col>
                      </Form.Group>
                      <Table responsive className="table" >
                            <thead className="tableHeader">
                                <tr>
                                    <th>Área</th>
                                    <th>Fileira</th>
                                    <th>Qtd. assentos</th>
                                    <th>
                                        <Form.Check />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <tr>
                                        {Array.from({ length: 3  }).map((_, index) => (
                                            <td key={index}>Table cell {index}</td>
                                        ))}
                                        <td>
                                            <Form.Check />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        
                        <Col sm="3">
                            <Button className="button" variant = "gray">Adicionar sessão</Button>
                        </Col>

                        <StandardTable></StandardTable>

                        <Col sm="3">
                            <Button className="button" variant="sea-blue-1">Criar evento</Button>
                        </Col>
                  </Form>
              </div>
          </>
        );
    }
}

export default WithPlace;







import React from "react";
import './styles.scss';

import { Form, Row, Col, Button } from 'react-bootstrap';

class WithoutPlace extends React.Component {
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

                            <Form.Label column sm="2">
                                Qtd. ingressos:
                            </Form.Label>
                            <Col sm="1">
                                <Form.Control type="number" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="row">
                            <Form.Label column sm="1">
                                Plano:
                            </Form.Label>
                            <Col sm="2"><Form.Control as="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                            </Col>
                        </Form.Group>
                        <Col sm="2">
                            <Button className="button" variant="sea-blue-1">Adicionar sessão</Button>
                        </Col>
                    </Form>
                </div>
            </>

        );
    }
}

export default WithoutPlace;






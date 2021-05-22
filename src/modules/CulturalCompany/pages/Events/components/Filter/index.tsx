import React from "react";
import { Button, Col, Form, Row } from 'react-bootstrap';
import './styles.scss';


class Filter extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {

    }
  };

  render() {
    return (
      <>
        <div className="filter-container">
          <Form className="filter">
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
          </Form>
        </div>
      </>
    );
  }
}

export default Filter;
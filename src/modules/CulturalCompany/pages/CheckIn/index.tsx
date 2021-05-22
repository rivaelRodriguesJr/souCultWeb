import { Pagination } from '@material-ui/lab';
import BaseContainer from "core/components/BaseContainer";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import './styles.scss';

const CheckIn = () => {
  return (
    <section>

      <BaseContainer title="Check-in">
        <h5>Novo check-in</h5>
      </BaseContainer>

      <div>
        <Form>
          <Form.Row id="checkin-form-row">
            <Col sm="2">
              <Form.Label>Nº do token: </Form.Label>
            </Col>
            <Col>
              <Form.Control type="text"></Form.Control>
            </Col>
            <Col>
              <Button id="validation-button" className="defaut-button">Validar</Button>
            </Col>
          </Form.Row>
          <hr className="base-container-divider" />
        </Form>
      </div>

      <div>
        <h5>Histórico check-in</h5>
      </div>

      <div id="checkin-div">
        <Form>
          <Form.Row>
            <Col sm="1">
              <Form.Label>Evento: </Form.Label>
            </Col>
            <Col>
              <Form.Control type="text"></Form.Control>
            </Col>
            <Col sm="1">
              <Form.Label>Data: </Form.Label>
            </Col>
            <Col>
              <Form.Control type="date"></Form.Control>
            </Col>
            <Col sm="1">
              <Form.Label>Token: </Form.Label>
            </Col>
            <Col>
              <Form.Control type="text"></Form.Control>
            </Col>
            <Col>
              <Button id="search-button" className="defaut-button">Buscar</Button>
            </Col>
          </Form.Row>
        </Form>
      </div>

      <section id="checkin-list">
        <Table responsive className="table" >
            <thead>
              <tr id="checkin-table-header">
                <th>Evento</th>
                <th>Token</th>
                <th>Data Check-in</th>
                <th>Hora Check-in</th>
                <th>Usuário</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 3 }).map((_, index) => (
                <tr>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <td key={index}>Table cell {index}</td>
                  ))}
                </tr>
              ))}
            </tbody>
        </Table>

      </section>

      <section className="pager">
        <Pagination count={3} />
      </section>


    </section>

  );

}

export default CheckIn;

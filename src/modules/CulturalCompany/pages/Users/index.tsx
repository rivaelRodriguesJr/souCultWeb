import './style.scss';
import AddCircle from 'core/assets/images/add+circle.png';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Pagination } from '@material-ui/lab';
import { makePrivateRequest } from "core/utils/request";
import { useEffect, useState } from "react";
import { User } from 'core/models/User';
import { Link } from 'react-router-dom';



const Users = () => {

  const [profile, setProfile] = useState<User>({} as User)
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    makePrivateRequest({ method: 'GET', url: '/profile' }).then(({ data }) => {
      setProfile(data);
    });

    const params = { 'user-type-id': [1, 2] };

    makePrivateRequest({ method: 'GET', url: '/users', params }).then(response => {
      setUsers(response.data);
    })
  }, []);


  return (

    <section>
      <h1 className="h1-adm-page">Perfil</h1>

      <Form>
        <Form.Row className="profile-row">

          <Col sm="1" >
            <Form.Label> Nome: </Form.Label>
          </Col>

          <Col className="profile-name-col">
            <Form.Label>{profile.name}</Form.Label>
          </Col>

          <Col sm="1">
            <Form.Label> CPF: </Form.Label>
          </Col>
          <Col className="profile-name-col">
            <Form.Label>{profile.cpf}</Form.Label>
          </Col>

        </Form.Row>

        <Form.Row id="profile-form-row2">

          <Col sm="1">
            <Form.Label> Email: </Form.Label>
          </Col>
          <Col className="profile-name-col">
            <Form.Label>{profile.email}</Form.Label>
          </Col>

          <Col sm="1">
            <Form.Label> Celular: </Form.Label>
          </Col>
          <Col className="profile-name-col">
            <Form.Label>{profile.email}</Form.Label>
          </Col>

        </Form.Row>
        <hr className="base-container-divider" />
      </Form>

      <h1 className="h1-adm-page">Lista de usuários</h1>

      <div id="user-list-div" className="user-list-div pb-3">
        <section id="search-adm-users container">
          <Form>
            <Form.Row>
              <Col sm="5">
                <Form.Group>
                  <Form.Label>Name:</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>

              <Col sm="5">
                <Form.Group>
                  <Form.Label>CPF:</Form.Label>
                  <Form.Control />
                </Form.Group>
              </Col>

              <Col className="d-flex align-items-end" sm="2">
                <button className="btn btn-sea-blue-2 btn-block mb-3" type="button">Buscar</button>
              </Col>
            </Form.Row>
          </Form>
        </section>
      </div>

      <section>
        <div className="d-flex justify-content-end mt-5">
          <Link to="/cultural-company/users/create" className="new-user-btn">+ Novo usuário</Link>
        </div>
      </section>

      <section id="adm-user-list">
        <Table responsive>
          <thead>
            <tr id="list-user-table-header">
              <th>Nome</th>
              <th>Data de criação</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>12/05/2021</td>
                <td>{user.email}</td>
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
export default Users;
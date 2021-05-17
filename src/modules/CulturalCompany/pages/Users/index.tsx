import './style.scss';
import AddCircle from 'core/assets/images/add+circle.png';
import Form  from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
// import Pagination from 'react-bootstrap/Pagination';
import { Pagination } from '@material-ui/lab';
import { makePrivateRequest } from "core/utils/request";
import { useEffect, useState } from "react";
import { User } from 'core/models/User';



const Users = () => {

  const [profile, setProfile] = useState<User>({} as User)
  
  useEffect(() => {
    makePrivateRequest({ method: 'GET', url: '/profile' }).then(({ data }) => {
      setProfile(data);
    });

    const params = { 'user-type-id': [1, 2] };

    makePrivateRequest({ method: 'GET', url: '/users', params }).then(response => {
      console.log(response.data);
    })
  }, []);


  return(

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

      <Form.Row>

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

    </Form>

    <h1 className="h1-adm-page">Lista de usuários</h1>

    <div id="user-list-div" className="user-list-div">
      <section id="search-adm-users">
        <Form>
          <Form.Row>
            <Col sm="1">
              <Form.Label>Name:</Form.Label>
            </Col>
            <Col>
              <Form.Control />
            </Col>
            <Col sm="1">
              <Form.Label>CPF:</Form.Label>
            </Col>
            <Col>
              <Form.Control />
            </Col>
            <Button id="search-button" className="search-button">Buscar</Button>
          </Form.Row>
        </Form>
      </section>

      <section id="add-new-user">
        <Row id="add-user-row">
          <Col>
            <img id="add-circle-img" className="add-circle-img" src={AddCircle} alt="Adicionar novo usuário"></img>
          </Col>

          <Col id="add-new-user-text-col">
            <p>Novo usuário</p>
          </Col> 
        </Row>
      </section>
    </div>

    <section id="adm-user-list">
      <Table responsive="sm">
        <thead>
          <tr id="list-user-table-header">
            <th>Nome</th>
            <th>Data de criação</th>
            <th>E-mail</th>
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

    </section>


    <section id="page">
      <Pagination count={10} />
    </section>

    </section>

  );
}
  export default Users;
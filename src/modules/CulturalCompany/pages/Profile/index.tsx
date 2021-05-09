import './style.scss';
import AddCircle from 'core/assets/images/add+circle.png';
import Form  from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { makePrivateRequest } from "core/utils/request";
import { useEffect, useState } from "react";
import { User } from 'core/models/User';



const Profile = () => {

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
      <h1>Perfil</h1>

    <Form>
      <Form.Row>
        
        <Col sm="1" >
          <Form.Label> Nome: </Form.Label>
        </Col>
        
        <Col >
          <Form.Label>{profile.name}</Form.Label>
          {/* <Form.Control plaintext readOnly type="name" placeholder={profile.name} /> */}
        </Col> 

        <Col sm="1">
          <Form.Label> CPF: </Form.Label>
        </Col>
        <Col>
          <Form.Label>{profile.cpf}</Form.Label>
          {/* <Form.Control plaintext readOnly type="cpf" placeholder={profile.cpf} />  */}
        </Col>

      </Form.Row>

      <Form.Row>

        <Col sm="1">
        <Form.Label>
          Email:
        </Form.Label>
        </Col>
        <Col>
          <Form.Label>{profile.email}</Form.Label>
          {/* <Form.Control plaintext readOnly type="email" placeholder={profile.email} /> */}
        </Col>

        <Col sm="1">
        <Form.Label>
          Celular:
        </Form.Label>
        </Col>
        <Col>
          <Form.Label>{profile.email}</Form.Label>
          {/* <Form.Control plaintext readOnly type="phone" placeholder={profile.phone} /> */}
        </Col>

      </Form.Row>

    </Form>

    <h1>Lista de usuários</h1>

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
          <Button>Buscar</Button>
        </Form.Row>
      </Form>
    </section>

    <section id="add-new-user">
      <Row id="add-user-row">
        <Col id="add-new-user-img-col">
          <img id="add-circle-img" className="add-circle-img" src={AddCircle} alt="Adicionar novo usuário"></img>
        </Col>

        <Col id="add-new-user-text-col">
          <p>Novo usuário</p>
        </Col> 
      </Row>
    </section>

    <section id="adm-user-list">
      <Table responsive="sm">
        <thead>
          <tr id="list-user-table-header">
            <th>Nome</th>
            <th>Data de criação</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody id="list-user-table-body">
          <tr>
            <td>Camila Silva</td>
            <td>29/03/2021</td>
            <td>camilla.silva@gmail.com</td>
          </tr>
          <tr>
            <td>Camila Silva</td>
            <td>29/03/2021</td>
            <td>camilla.silva@gmail.com</td>
          </tr>
          <tr>
            <td>Camila Silva</td>
            <td>29/03/2021</td>
            <td>camilla.silva@gmail.com</td>
          </tr>
        </tbody>
      </Table>

    </section>


    <section id="pagination">
      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item active>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item>{7}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </section>

    </section>

  );
}
  export default Profile;
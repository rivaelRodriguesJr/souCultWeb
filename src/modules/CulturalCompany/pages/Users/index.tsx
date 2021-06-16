import { CircularProgress, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Pagination } from '@material-ui/lab';
import DeleteButton from 'core/components/DeleteButton';
import { User, UserPagedDetails, UsersPaged } from 'core/models/User';
import { getSessionData } from 'core/utils/auth';
import { makePrivateRequest } from "core/utils/request";
import { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import './style.scss';

interface PaginationInfo {
  count: number;
  page: number;
  rowsPerPage: number;
}

interface EventRequestHeaders {
  take: number;
  skip: number;
}

const Users = () => {
  const [profile, setProfile] = useState<User>({} as User);
  const [users, setUsers] = useState<UserPagedDetails[]>([]);
  const [isLoadingTable, setIsLoadingTable] = useState(false);

  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    count: 0,
    page: 1,
    rowsPerPage: 3
  });


  useEffect(() => {
    searchList(paginationInfo.page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationInfo.page]);

  useEffect(() => {
    const { user } = getSessionData();

    setProfile({
      "user-type-id": -1,
      cpf: user.document_id,
      email: user.username,
      name: user.name,
      password: '*******',
      phone: user.phone,
      id: user.id
    });

  }, []);


  const searchList = (page: number) => {
    const params: EventRequestHeaders = {
      take: paginationInfo.rowsPerPage,
      skip: (page - 1) * paginationInfo.rowsPerPage
    }

    setUsers([]);
    setIsLoadingTable(true);

    makePrivateRequest<UsersPaged>({ method: 'GET', url: '/user/all', params })
      .then(({ data }) => {
        const count = Math.ceil(data.count / paginationInfo.rowsPerPage);
        setPaginationInfo({ ...paginationInfo, count });

        setUsers(data.events);
      })
      .catch(console.error)
      .finally(() => setIsLoadingTable(false));
  }

  const handleDelete = (userId: number) => {
    makePrivateRequest({ method: 'DELETE', url: `/user/${userId}` }).then(() => {
      const msg = `Usuário excluído com sucesso!`;
      toast.info(msg);
      searchList(1);
    })
  }

  const handleChangePage = (_: any, page: number) => {
    setPaginationInfo({ ...paginationInfo, page });
  }

  return (

    <section>
      <h1 className="h1-adm-page">Perfil</h1>

      <Form>
        <Form.Row className="profile-row">

          <Col sm="6" >
            <Form.Label className="fw-bold mr-2">Nome:</Form.Label>
            <Form.Label>{profile.name}</Form.Label>
          </Col>

          <Col sm="6">
            <Form.Label className="fw-bold mr-2">CPF:</Form.Label>
            <Form.Label>{profile.cpf}</Form.Label>
          </Col>

          <Col sm="6">
            <Form.Label className="fw-bold mr-2">Email:</Form.Label>
            <Form.Label >{profile.email}</Form.Label>
          </Col>

          <Col sm="6">
            <Form.Label className="fw-bold mr-2">Celular:</Form.Label>
            <Form.Label >{profile.phone}</Form.Label>
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
          <Link to="users/create" className="new-user-btn">+ Novo usuário</Link>
        </div>
      </section>

      <section id="adm-user-list">
        <Table responsive>
          <thead>
            <tr id="list-user-table-header">
              <th>Nome</th>
              <th>Data de criação</th>
              <th>E-mail</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoadingTable &&
              <tr>
                <td className="text-center" colSpan={4}><CircularProgress color="primary" /></td>
              </tr>}
            {users.map((user, index) => (
              <tr key={index}>
                <td className="pt-4">{user.name}</td>
                <td className="pt-4">{user.createDate}</td>
                <td className="pt-4">{user.username}</td>
                <td>
                  <Link
                    to={`/cultural-company/users/${user.id}`}
                  >
                    <IconButton>
                      <EditIcon color="primary" />
                    </IconButton>
                  </Link>
                  <DeleteButton handleDelete={() => user?.id && handleDelete(user.id)} />
                </td>
              </tr>)
            )}

          </tbody>
        </Table>

      </section>


      <div className="pager">
        <Pagination
          count={paginationInfo.count}
          page={paginationInfo.page}
          onChange={handleChangePage}
        />
      </div>
    </section>
  );
}
export default Users;

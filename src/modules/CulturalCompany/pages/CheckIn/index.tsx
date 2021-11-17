import { Pagination } from '@material-ui/lab';
import BaseContainer from "core/components/BaseContainer";
import { makePrivateRequest } from "core/utils/request";
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import './styles.scss';
import { toast } from 'react-toastify';
import Table from "./components/Table";
import { CheckInObj } from "core/models/Event";

interface RequestHeaders {
  take: number;
  skip: number;
}

interface PaginationInfo {
  count: number;
  page: number;
  rowsPerPage: number;
}

const CheckIn = () => {
  const [token, setToken] = useState(String);
  const [checkIns, setCheckIns] =  useState<CheckInObj[]>([]);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    count: 0,
    page: 1,
    rowsPerPage: 3
  });

  async function validToken(){
    if(token == null || token == ""){
      toast.error('Token inválido!');
    }else{
      makePrivateRequest({ method: 'GET', url: `token/${token}` })
      .then(({ data }) => {
        console.log(data);
        if(data.isValidToken){
          toast.success('Token validado com sucesso!');
        }else{
          toast.error('Token inválido!');
        }
      })
    }
  };

  async function getChekIns(params: RequestHeaders){
    makePrivateRequest({ method: 'GET', url: `scheduling/company`, params })
    .then(({ data }) => {
      const count = Math.ceil(data.length / paginationInfo.rowsPerPage);
      setPaginationInfo({ ...paginationInfo, count });
      setCheckIns(data[0]);
    })
    .catch(console.error)
    .finally(() => setIsLoadingTable(false));
  }

  useEffect(() => {
    const params: RequestHeaders = {
      take: paginationInfo.rowsPerPage,
      skip: (paginationInfo.page - 1) * paginationInfo.rowsPerPage
    }
    setCheckIns([]);
    setIsLoadingTable(true);
    getChekIns(params);

  }, [paginationInfo.page]);

  function handleInputChange(ev:any){
    console.log(ev);
    setToken(ev.target.value);
  };

  const handleChangePage = (_: any, page: number) => {
    setPaginationInfo({ ...paginationInfo, page });
  }

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
              <Form.Control type="text" onChange = {handleInputChange} value = {token}></Form.Control>
            </Col>
            <Col>
              <Button id="validation-button" className="defaut-button" onClick = {validToken}>Validar</Button>
            </Col>
          </Form.Row>
          <hr className="base-container-divider" />
        </Form>
      </div>

      <div>
        <h5>Histórico check-in</h5>
      </div>

      <section id="checkin-list">
        <Table
          isLoading={isLoadingTable}
          checkIns={checkIns}
        ></Table>
      </section>

    </section>

  );

}

export default CheckIn;

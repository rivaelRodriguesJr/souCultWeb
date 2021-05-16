import React, { useEffect, useState } from 'react';
import BaseContainer from "core/components/BaseContainer";
import { Pagination } from '@material-ui/lab';
import './styles.scss';
import { makePrivateRequest } from 'core/utils/request';
import { Table } from 'react-bootstrap';

class Rooms extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {

    }
  };

  render() {
    return (
      <>
        <BaseContainer title="Salas">
          <div><h5>Lista de salas</h5></div>
          <div className="newRoom">
            <a href="/cultural-company/newroom">+ Nova sala</a>
          </div>
          <div>
            <Table responsive className="table" >
              <thead className="tableHeader">
                <tr>
                  <th>Nome da sala</th>
                  <th>Qtd. Assentos</th>
                  <th>Ações</th>
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
          </div>
          <div className="pager">
            <Pagination count={10} />
          </div>
        </BaseContainer>
      </>
    );
  }
}

export default Rooms;
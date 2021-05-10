import React from "react";
import BaseContainer from "core/components/BaseContainer";
import Filter from "./components/Filter";
import Table from "./components/Table";
import { Pagination } from '@material-ui/lab';
import './styles.scss';

class Events extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {

    }
  };

  render() {
    return (
      <>
        <BaseContainer title="Meus eventos">
          <Filter></Filter>
          <div className="newOrder">
            <a href = "/cultural-company/newevent">+ Novo evento</a>
          </div>
          <Table></Table>
          <div className="pager">
            <Pagination count={10} />
          </div>
        </BaseContainer>
      </>
    );
  }
}

export default Events;

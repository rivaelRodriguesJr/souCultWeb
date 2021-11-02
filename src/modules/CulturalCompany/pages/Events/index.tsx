import { Pagination } from '@material-ui/lab';
import BaseContainer from "core/components/BaseContainer";
import { Event, EventsPaged } from 'core/models/Event';
import { makePrivateRequest } from 'core/utils/request';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Filter, { EventFilterFormState } from "./components/Filter";
import Table from "./components/Table";
import './styles.scss';

interface PaginationInfo {
  count: number;
  page: number;
  rowsPerPage: number;
}

interface EventRequestHeaders extends EventFilterFormState {
  take: number;
  skip: number;
}

const Events = () => {
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    count: 0,
    page: 1,
    rowsPerPage: 3
  });

  const [events, setEvents] = useState<Event[]>([]);
  const [isLoadingTable, setIsLoadingTable] = useState(false);

  const search = (data: EventFilterFormState = {}) => {
    const params: EventRequestHeaders = {
      take: paginationInfo.rowsPerPage,
      skip: (paginationInfo.page - 1) * paginationInfo.rowsPerPage,
      city: data.city,
      nameEvent: data.nameEvent,
      state: data.state, 
      status: data.status,
    }

    setEvents([]);
    setIsLoadingTable(true);

    makePrivateRequest<EventsPaged>({ method: 'GET', url: '/event/filter', params })
      .then(({ data }) => {
        const count = Math.ceil(data.count / paginationInfo.rowsPerPage);
        setPaginationInfo({ ...paginationInfo, count });
        setEvents(data.events);
      })
      .catch(console.error)
      .finally(() => setIsLoadingTable(false));

  }


  useEffect(() => {
    search();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationInfo.page]);

  const handleChangePage = (_: any, page: number) => {
    setPaginationInfo({ ...paginationInfo, page });
  }

  return (
    <BaseContainer title="Meus eventos">
      <Filter onSubmit={search} />
      <div className="newOrder">
        <Link to="/cultural-company/events/create">+ Novo evento</Link>
      </div>
      <Table
        isLoading={isLoadingTable}
        events={events}
      ></Table>
      <div className="pager">
        <Pagination
          count={paginationInfo.count}
          page={paginationInfo.page}
          onChange={handleChangePage}
        />
      </div>
    </BaseContainer>
  );
}

export default Events;

import { Pagination } from '@material-ui/lab';
import BaseContainer from "core/components/BaseContainer";
import { Event, EventsPaged } from 'core/models/Event';
import { makePrivateRequest } from 'core/utils/request';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Filter from "./components/Filter";
import Table from "./components/Table";
import './styles.scss';

interface PaginationInfo {
  count: number;
  page: number;
  rowsPerPage: number;
}

interface EventRequestHeaders {
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

  useEffect(() => {
    const params: EventRequestHeaders = {
      take: paginationInfo.rowsPerPage,
      skip: (paginationInfo.page - 1) * paginationInfo.rowsPerPage
    }

    setEvents([]);
    setIsLoadingTable(true);

    makePrivateRequest<EventsPaged>({ method: 'GET', url: '/event/all', params })
      .then(({ data }) => {
        const count = Math.ceil(data.count / paginationInfo.rowsPerPage);
        setPaginationInfo({ ...paginationInfo, count });
        setEvents(data.events);
      })
      .catch(console.error)
      .finally(() => setIsLoadingTable(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationInfo.page]);

  const handleChangePage = (_: any, page: number) => {
    setPaginationInfo({ ...paginationInfo, page });
  }

  return (
    <BaseContainer title="Meus eventos">
      <Filter />
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

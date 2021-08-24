import { Pagination } from '@material-ui/lab';
import BaseContainer from "core/components/BaseContainer";
import { Room, RoomsPaged } from 'core/models/Room';
import { makePrivateRequest } from 'core/utils/request';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import RoomListTable from './components/RoomListTable';
import './styles.scss';

interface PaginationInfo {
  count: number;
  page: number;
  rowsPerPage: number;
}

interface RoomRequestHeaders {
  take: number;
  skip: number;
}

const Rooms = () => {

  const [rooms, setRooms] = useState<Room[]>([]);
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


  const searchList = (page: number) => {
    const params: RoomRequestHeaders = {
      take: paginationInfo.rowsPerPage,
      skip: (page - 1) * paginationInfo.rowsPerPage
    }

    setRooms([]);
    setIsLoadingTable(true);

    makePrivateRequest<RoomsPaged>({ method: 'GET', url: '/room/all', params })
      .then(({ data }) => {
        const count = Math.ceil(data.count / paginationInfo.rowsPerPage);
        setPaginationInfo({ ...paginationInfo, count });

        setRooms(data.rooms);
      })
      .catch(() => {
        toast.error('Erro ao buscar salas.');
      })
      .finally(() => setIsLoadingTable(false));
  }

  const handleChangePage = (_: any, page: number) => {
    setPaginationInfo({ ...paginationInfo, page });
  }

  const handleDelete = (roomId: number) => {
    makePrivateRequest({ method: 'DELETE', url: `/room/${roomId}` })
    .then(() => {
      const msg = `Sala excluída com sucesso!`;
      toast.info(msg);
      searchList(1);
    })
    .catch(() => {
      toast.error('Erro ao excluir sala.');
    })
  }

  return (
    <>
      <BaseContainer title="Salas">
        <div><h5>Lista de salas</h5></div>
        <div className="newRoom">
          <Link to="/cultural-company/rooms/create">+ Nova sala</Link>
        </div>
        <div>
          <RoomListTable 
            rooms={rooms}
            isLoading={isLoadingTable}
            handleDelete={handleDelete}
          />
        </div>
        <div className="pager">
        <Pagination
          count={paginationInfo.count}
          page={paginationInfo.page}
          onChange={handleChangePage}
        />
        </div>
      </BaseContainer>
    </>
  );
}

export default Rooms;
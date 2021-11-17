import StarBorderIcon from '@material-ui/icons/StarBorder';
import { CircularProgress, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Event } from "core/models/Event";
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles.scss';
import Rating from 'core/components/Rating';
import { useState } from 'react';
import { makePrivateRequest } from "core/utils/request";
import { useEffect } from 'react';
import StarRateIcon from '@material-ui/icons/StarRate';


interface Props {
  events: Event[];
  isLoading: boolean;
}

const TableStandard = ({ events, isLoading }: Props) => {

  const [modalShow, setModalShow] = useState(false);
  const [event, setEvent] = useState<Event>()

  const handleRatingClick = (selectedEvent: Event) => {
    setEvent(selectedEvent);
    setModalShow(true);
  }

  const handleHideRatingModal = () => {
    setEvent(undefined);
    setModalShow(false);

  }
  const [ratings, setRatings] = useState(Object);

  async function eventRating() {
    makePrivateRequest({ method: 'GET', url: `event/${event?.id}/evaluation` })
      .then(({ data }) => {
        setRatings(data.media);
      })
  };
  useEffect(() => {
    eventRating()
  }, []);


  return (
    <div>
      {event && <Rating show={modalShow} onHide={() => setModalShow(false)} event={event} />}

      <Table responsive className="table" >
        <thead className="tableHeader">
          <tr>
            <th>Nome do evento</th>
            <th>Ingressos agendados</th>
            <th>Status</th>
            <th>Local</th>
            <th>Avaliações</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="tableBody">
          {isLoading &&
            <tr>
              <td className="text-center" colSpan={4}><CircularProgress color="primary" /></td>
            </tr>}
          {events.map((event, index) => (
            <tr key={index}>
              <td>{event?.name}</td>
              <td>{`${event?.total_used}/${event?.tickets_qtd} `}</td>
              <td>{event?.status}</td>
              <td>{`${event?.place?.city}/${event?.place?.state}`}</td>
              <td>
                <IconButton onClick={() => handleRatingClick(event)}>
                  {[1.00, 2.00, 3.00].map((element) => {
                    if (element <= (parseFloat(ratings.media_score) + 0)) {
                      return <StarRateIcon color="primary" fontSize="small" />
                    }
                    return <StarRateIcon color="disabled" fontSize="small" />

                  })}
                </IconButton>
              </td>
              <td>
                <Link
                  to={`/cultural-company/events/${event.id}`}
                >
                  <IconButton>
                    <EditIcon color="primary" />
                  </IconButton>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TableStandard;

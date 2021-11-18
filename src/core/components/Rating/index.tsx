import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StarRateIcon from '@material-ui/icons/StarRate';
import { Event } from "core/models/Event";
import { makePrivateRequest } from "core/utils/request";
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import confort from '../../assets/images/rating/ComfortOn.png';
import instalations from '../../assets/images/rating/InstallationsOn.png';
import entertainment from '../../assets/images/rating/TrainingOn.png';
import './style.scss';


interface Props {
  show: boolean;
  onHide: () => void;
  event: Event;
}

const Rating = ({ show, onHide, event }: Props) => {

  const [ratings, setRatings] = useState({
    media_score: "",
    count_great_facilities: "",
    excellent_entertainment: "",
    comfortable_place: "",
  });
  const [msgs, setMsgs] = useState(new Array());

  async function eventRating() {
    makePrivateRequest({ method: 'GET', url: `event/${event.id}/evaluation` })
      .then(({ data }) => {
        setRatings(data["media"]);
        setMsgs(data.comets);
      })
  };
  useEffect(() => {
    eventRating()
  }, []);

  const Body = () => (
    <>
      <div className="d-flex justify-content-end">
        <i onClick={() => window.location.reload()} className="rating-modal-close-button">
          <FontAwesomeIcon icon={faTimes} />
        </i>
      </div>

      <div className="rating-title-container">
        <h1 className="rating-title" >AVALIAÇÕES DO EVENTO</h1>
        <h2 className="event-name">{event.name}</h2>
      </div>
      <div >
        <div className="rating-stars">
          {[1.00, 2.00, 3.00].map((element) => {
            if (element <= (parseFloat(ratings.media_score) + 0)) {
              return <StarRateIcon color="primary" fontSize="large" />
            }
            return <StarRateIcon color="disabled" fontSize="large" />

          })}
        </div>
        <div className="rating-section">
          <div className="item-section">
            <img className="item-img" src={instalations} alt="Conforto" />
            <div>
              <text className="section-text">Ótimas</text>
              <text className="section-text">Instalações</text>
            </div>
            <div>
              <text className="section-text">{ratings.count_great_facilities}</text>
            </div>

          </div>

          <div className="item-section">
            <img className="item-img" src={entertainment} alt="Conforto" />
            <div>
              <text className="section-text">Excelente</text>
              <text className="section-text">Entretenimento</text>
            </div>
            <div>
              <text className="section-text">{ratings.excellent_entertainment}</text>
            </div>

          </div>


          <div className="item-section" >
            <img className="item-img" src={confort} alt="Conforto" />
            <div>
              <text className="section-text">Local</text>
              <text className="section-text">Confortável</text>
            </div>

            <div>
              <text className="section-text">{ratings.comfortable_place}</text>
            </div>
          </div>

        </div>

        <div>
          <div className="scrollbar scrollbar-juicy-peach">
            {msgs.map((comment: any) => {
              return <text className="section-text rating-comments">{comment.comment}</text>
            })}

            <text className="section-text">Evento sem comentários</text>

          </div>

        </div>



      </div>
    </>
  );

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        centered
        backdrop={false}
      >
        <Modal.Body>
          <Body />
        </Modal.Body>
      </Modal >
    </>
  );
}
export default Rating;
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Modal from 'react-bootstrap/Modal';
import entertainment from '../../assets/images/rating/TrainingOn.png';
import confort from '../../assets/images/rating/ConfortOn.png';
import instalations from '../../assets/images/rating/InstallationsOn.png';


interface Props {
    show: boolean;
    onHide: () => void;
}

const Rating = ({ show, onHide }: Props) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className="d-flex justify-content-end">
                    <i onClick={onHide} className="rating-modal-close-button">
                        <FontAwesomeIcon icon={faTimes} />
                    </i>
                </div>
                <div className="rating-container">

                    <div>
                        <h1 className="rating-title" >AVALIAÇÕES DO EVENTO</h1>
                        <h2>{event.name}</h2>
                    </div>
                    <div className="rating-stars">
                        <IconButton>
                            <StarBorderIcon fontSize="small" />
                        </IconButton>
                        <Image src={confort} />
                        <Image src={instalations} />
                        <Image src={entertainment} />

                    </div>

                    <div className="rating-comments">
                        {event.comments.map((comment, index) => {
                            <text key={index}>{comment.text}</text>
                        })}
                    </div>

                </div>

            </Modal.Body>
        </Modal>

    );
}
export default Rating;
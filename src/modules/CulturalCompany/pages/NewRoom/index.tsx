import './styles.scss';

import BackdropLoader from 'core/components/BackdropLoader';
import BaseContainer from 'core/components/BaseContainer';
import ControlledFormControl from 'core/components/ControlledFormControl';
import { makePrivateRequest } from 'core/utils/request';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import ImageUpload from '../NewEvent/components/ImageUpload';
import SeatForm from './components/SeatForm';
import SeatTable from './components/SeatTable';
import { DetailedRoomResponse } from 'core/models/Room';
import { Seat } from 'core/models/Seat';

interface FormState {
  name: string;
}

interface Params {
  roomId: string;
}


const NewRoom = () => {
  const history = useHistory();
  const { roomId } = useParams<Params>();
  const [isLoading, setIsLoading] = useState(false);

  const [image, setImage] = useState('');
  const isEditing = roomId !== 'create';

  const [seats, setSeats] = useState<Seat[]>([])

  const { handleSubmit, formState: { errors }, control, getValues, setValue, } = useForm<FormState>();

  useEffect(() => {
    if (isEditing) {
      setIsLoading(true);
      makePrivateRequest<DetailedRoomResponse>({ url: `/room/${roomId}` })
        .then(response => {
          const { entity } = response.data;
          setValue('name', entity.name);
          setImage(entity.image_link || '');
          setSeats(entity.seats || []);

        }).catch(() => {
          const msg = `Erro ao buscar sala.`;
          toast.error(msg);
          history.goBack();
        }).finally(() => {
          setIsLoading(false);
        });
    }
  }, [roomId, isEditing, history, setValue]);

  const onSubmit = () => {

  }

  const handleSeatDelete = (seat: number) => {
    const s: Seat[] = seats.slice();
    const index = s.findIndex(session => Number(session.id) === Number(seat));
    s.splice(index, 1);
    setSeats(s);
  }

  const handleSeatEdit = (sessionId: number) => {
    console.log(sessionId);
    // const session = sessions.find(session => Number(session.id) === Number(sessionId));

    // let time = '';
    // let date = '';

    // if (session?.moment) {
    //   time = moment(session.moment).format('HH:mm');
    //   date = moment(session.moment).format('YYYY-MM-DD');
    // }

    // setValue('id', session?.id);
    // setValue('date', date);
    // setValue('planId', session?.id_plan || -1);
    // setValue('room', session?.room || '');
    // setValue('ticketsQtd', session?.quantity_tickets || -1);
    // setValue('time', time);
  }

  return (
    <>
      <BackdropLoader isLoading={isLoading} />
      <BaseContainer title="NOVA SALA">

        <Form>
          <Row>
            <Col sm="6">
              <Form.Group>
                <Form.Label>Nome da Sala<i className="text-danger">*</i></Form.Label>
                <ControlledFormControl
                  name="name"
                  control={control}
                  errors={errors}
                  rules={{
                    required: 'Campo obrigatório'
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm="6">
              <Form.Label>
                Imagem da sala
              </Form.Label>
              <div>
                <ImageUpload
                  text="Importar"
                  image={image}
                  onUploadSuccess={console.log}
                />
              </div>


            </Col>
          </Row>

        </Form>

        <SeatForm submitSeat={console.log} />
        <SeatTable 
          seats={seats}
          handleDelete={handleSeatDelete}
          handleEdit={handleSeatEdit}
        />

        <Col sm="2">
          <Button
            className="button"
            variant="sea-blue-1"
            onClick={() => handleSubmit(onSubmit)()}
          >Criar sala</Button>
        </Col>

      </BaseContainer>
    </>
  );
}

export default NewRoom;
import './styles.scss';

import BackdropLoader from 'core/components/BackdropLoader';
import BaseContainer from 'core/components/BaseContainer';
import ControlledFormControl from 'core/components/ControlledFormControl';
import { DetailedRoom, DetailedRoomResponse } from 'core/models/Room';
import { Seat } from 'core/models/Seat';
import { makePrivateRequest } from 'core/utils/request';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import ImageUpload from '../NewEvent/components/ImageUpload';
import SeatForm from './components/SeatForm';

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

  const [seats, setSeats] = useState<Seat[]>([]);
  const [uploadedImgUrl, setUploadedImgUrl] = useState('');

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
  
    const room: DetailedRoom = {
      name: getValues('name'),
      image_link: uploadedImgUrl || image,
      seats
    } as any;

    setIsLoading(true);
    makePrivateRequest({
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/room/${roomId}` : '/room',
      data: room
    }).then(() => {
      const msg = `Sala ${isEditing ? 'alterada' : 'salva'} com sucesso!`;
      toast.info(msg);
      history.goBack();
    }).catch(() => {
      const msg = `Erro ao ${isEditing ? 'alterar' : 'salvar'} sala!`;
      toast.error(msg);
    }).finally(() => {
      setIsLoading(false);
    });
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
                  onUploadSuccess={setUploadedImgUrl}
                />
              </div>

            </Col>
          </Row>

        </Form>

        <SeatForm seats={seats} setSeats={setSeats} />

        <Row className="justify-content-end">
          <Col sm="2">
            <Button
              type="button"
              className="button"
              variant="secondary"
              onClick={() => history.goBack()}
            >Voltar</Button>
          </Col>
          <Col sm="2">
            <Button
              type="button"
              className="button"
              variant="sea-blue-1"
              onClick={() => handleSubmit(onSubmit)()}
            >{`${isEditing ? 'Editar' : 'Criar'} sala`}</Button>
          </Col>
        </Row>

      </BaseContainer>
    </>
  );
}

export default NewRoom;

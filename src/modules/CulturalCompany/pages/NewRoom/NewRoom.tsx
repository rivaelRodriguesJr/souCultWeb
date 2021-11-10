import BackdropLoader from 'core/components/BackdropLoader';
import BaseContainer from 'core/components/BaseContainer';
import Area from 'core/models/Area';
import Room from 'core/models/Room';
import { makePrivateRequest } from 'core/utils/request';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ImageUpload from '../NewEvent/components/ImageUpload';
import AreaForm from './components/AreaForm';
import './styles.scss';

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

  const [areas, setAreas] = useState<Area[]>([]);
  const [uploadedImgUrl, setUploadedImgUrl] = useState('');

  const { handleSubmit, formState: { errors }, control, getValues, setValue, } = useForm<FormState>();

  useEffect(() => {
    if (isEditing) {
      setIsLoading(true);
      makePrivateRequest<{ entity: Room }>({ url: `/room/${roomId}` })
        .then(response => {
          const { entity } = response.data;
          setValue('name', entity.name);
          setImage(entity.image_link || '');

          const mappedAreas: Area[] = [];
          entity.areas.forEach(area => {
            area.rows.forEach(row => {
              mappedAreas.push({
                ...area,
                rows: [row]
              })
            });
          });
          setAreas(mappedAreas);
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

    const room: Room = {
      id: 0,
      name: getValues('name'),
      image_link: uploadedImgUrl || image,
      areas,
    };

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
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState }) =>
                    <>
                      <Form.Control
                        type="text"
                        isInvalid={fieldState.invalid}
                        {...field}
                      />
                      {errors[field.name] &&
                        <Form.Control.Feedback type="invalid">
                          {errors[field.name]?.message}
                        </Form.Control.Feedback>
                      }
                    </>
                  }
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

        <AreaForm areas={areas} setAreas={setAreas} />

        <Row className="justify-content-end">
          <Col sm="2">
            <Button
              type="button"
              className="button"
              variant="secondary"
              onClick={() => history.goBack()}
            >Voltar</Button>
          </Col>
          {
            !isEditing &&
            <Col sm="2">
              <Button
                type="button"
                className="button"
                variant="sea-blue-1"
                onClick={() => handleSubmit(onSubmit)()}
              >Criar sala</Button>
            </Col>
          }
        </Row>

      </BaseContainer>
    </>
  );
}

export default NewRoom;

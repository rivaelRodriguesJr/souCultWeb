import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';

import './styles.scss';

type Props = {
  show: boolean;
  onHide: () => void;
}

type FormState = {
  username: string;
  password: string;
}

const LoginModal = ({ show, onHide }: Props) => {
  const { register, handleSubmit, formState: { errors }  } = useForm<FormState>();

  const onSubmit = (data: FormState) => {
    console.log(data);
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="d-flex justify-content-end">
          <i onClick={onHide}>
            <FontAwesomeIcon icon={faTimes} />
          </i>
        </div>
        <div className="login-form-container">
          <h2 className="login-form-title" >LOGIN</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              className={`form-control input-base ${errors.username && 'is-invalid'}`}
              placeholder="Email"
              {...register('username', { required: "Campo obrigatório", pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido"
                }})
              }
            />
            <div className="invalid-feedback d-block">{errors.username?.message}</div>

            <input
              type="password"
              className={`form-control input-base ${errors.password && 'is-invalid'}`}
              placeholder="Senha"
              {...register('password', { required: "Campo obrigatório" })}
            />
            <div className="invalid-feedback d-block">{errors.password?.message}</div>

            <div className="login-form-forgot-password-container">
              <a href="#/forgot-password" className="login-form-forgot-password text-orange-1">Lembrar senha</a>
            </div>

            <div className="row">
              <div className="col-6 login">
                <button
                  type="submit"
                  className="btn btn-orange-1 text-white login-form-button"
                >Entrar</button>
              </div>
              <div className="col-6 register">
                <button
                  type="button"
                  className="btn btn-gray login-form-button"
                >Requisitar cadastro</button>
              </div>
            </div>

          </form>
        </div>
      </Modal.Body>
    </Modal>

  );
}

export default LoginModal;

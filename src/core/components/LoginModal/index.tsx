import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserType } from 'core/models/enums/UserType';
import { LoginResponse } from 'core/models/LoginResponse';
import { saveSessionData } from 'core/utils/auth';
import { makeLogin } from 'core/utils/request';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { toast } from "react-toastify";
import './styles.scss';

interface Props {
  show: boolean;
  onHide: () => void;
}

interface FormState {
  username: string;
  password: string;
}

const LoginModal = ({ show, onHide }: Props) => {
  const { register, handleSubmit, formState: { errors }  } = useForm<FormState>();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: FormState) => {
    setIsLoading(true);
    makeLogin<LoginResponse>(data)
      .then(response => {

        saveSessionData(response.data);
        const { company_type_id } = response.data.user;

        if (company_type_id === UserType.EVENT_ADMIN) {
          history.push('/cultural-company');
        } else if (company_type_id === UserType.COMPANY_ADMIN) {
          history.push('/company');
        }

      }).catch(error => {
        let msg;
        if(error.response.data.error === 'Incorrect username/password combination.') {
          msg = 'Usuário ou senha inválidos.';
        } else {
          msg = 'Erro ao realzar login.';
        }
        
        toast.error(msg);
      }).finally(() => {
        setIsLoading(false);
      });
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
          <i onClick={onHide} className="login-modal-close-button">
            <FontAwesomeIcon icon={faTimes} />
          </i>
        </div>
          <i className="bi bi-x"></i>
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
            <div className="invalid-feedback d-block mb-5">{errors.password?.message}</div>

            {/* <div className="login-form-forgot-password-container">
              <a href="#/forgot-password" className="login-form-forgot-password text-orange-1">Lembrar senha</a>
            </div> */}

            <div className="row">
              <div className="col-6 login">
                <button
                  type="submit"
                  className="btn btn-orange-1 text-white login-form-button d-flex align-items-center justify-content-center"
                >Entrar
                {isLoading && (<Spinner animation="border" size="sm" className="ml-2" />)}
                </button>
              </div>
              <div className="col-6 register">
                <Link
                  to="/home/register"
                  onClick={onHide}
                  type="button"
                  className="btn btn-gray login-form-button"
                >Requisitar cadastro</Link>
              </div>
            </div>

          </form>
        </div>
      </Modal.Body>
    </Modal>

  );
}

export default LoginModal;

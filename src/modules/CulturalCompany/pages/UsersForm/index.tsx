import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import BaseContainer from "core/components/BaseContainer";
import { User, UserPayload } from "core/models/User";
import { getSessionData } from "core/utils/auth";
import { makePrivateRequest } from "core/utils/request";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import './styles.scss';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

interface FormState {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  cpf: string;
  phone: string;
}

interface ParamsType {
  userId: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

const UsersForm = () => {
  const { register, handleSubmit, formState: { errors }, watch, control, setValue } = useForm<FormState>();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  const { userId } = useParams<ParamsType>();
  const isEditing = userId !== 'create';
  const formButton = isEditing ? 'Editar usuário' : 'Adicionar usuário';

  const password = useRef({});
  password.current = watch("password", "");

  useEffect(() => {
    if (isEditing) {
      makePrivateRequest<User>({ url: `/users/${userId}` })
        .then(({ data }) => {
          setValue('name', data.name);
          setValue('cpf', data.cpf);
          setValue('email', data.email);
          setValue('password', data.password);
          setValue('passwordConfirm', data.password);
          setValue('phone', data.phone);
        });
    }
  }, [userId, isEditing, setValue]);

  const onSubmit = (data: FormState) => {
    const sessionData = getSessionData();

    const user: UserPayload = {
      company_id: sessionData.user.company_id,
      company_type_id: sessionData.user.company_type_id,
      document_id: data.cpf,
      name: data.name,
      password: data.password,
      phone: data.phone,
      username: data.email
    };

    setIsLoading(true);
    makePrivateRequest({
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/user/${userId}` : '/user',
      data: user
    }).then(() => {
      const msg = `Usuário ${isEditing ? 'alterado' : 'salvo'} com sucesso!`;
      toast.info(msg);
      history.goBack();
    }).catch(() => {
      const msg = `Erro ao ${isEditing ? 'alterar' : 'salvar'} usuário!`;
      toast.error(msg);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  return (
    <>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="primary" />
      </Backdrop>

      <BaseContainer title="Administradores">
        <h2 className="sub-title mb-4">Novo Usuário</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">

            <div className="col-sm-12 col-md-6 form-group">
              <label>Nome<i className="text-danger">*</i></label>
              <input
                id="name"
                type="text"
                className={`form-control ${errors.name && 'is-invalid'}`}
                {...register('name', { required: "Campo obrigatório" })}
              />
              <div className="invalid-feedback d-block">{errors.name?.message}</div>
            </div>

            <div className="col-sm-12 col-md-6 form-group">
              <label className="user-form-label">CPF<i className="text-danger">*</i></label>
              <Controller
                control={control}
                name="cpf"
                render={({ field }) =>
                  <InputMask
                    className={`form-control ${errors.cpf && 'is-invalid'}`}
                    mask="999.999.999-99"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                }
                rules={{
                  required: 'Campo obrigatório', pattern: {
                    // eslint-disable-next-line no-useless-escape
                    value: /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/,
                    message: 'CPF inválido'
                  }
                }}
              />
              <div className="invalid-feedback d-block">{errors.cpf?.message}</div>
            </div>
            <div className="col-sm-12 col-md-6 form-group">
              <label className="user-form-label">E-mail<i className="text-danger">*</i></label>
              <input
                id="email"
                type="email"
                className={`form-control ${errors.email && 'is-invalid'}`}
                {...register('email', {
                  required: "Campo obrigatório", pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido"
                  }
                })
                }
              />
              <div className="invalid-feedback d-block">{errors.email?.message}</div>
            </div>

            <div className="col-sm-12 col-md-6 form-group">
              <label className="user-form-label">Celular<i className="text-danger">*</i></label>
              <Controller
                control={control}
                name="phone"
                render={({ field }) =>
                  <InputMask
                    className={`form-control ${errors.phone && 'is-invalid'}`}
                    mask="(99) 99999-9999"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                }
              // rules={{ required: 'Campo obrigatório', pattern:{
              //   // eslint-disable-next-line no-useless-escape
              //   value: /^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [5-9][0-9]{3}-[0-9]{4})$/,
              //   message: 'Celular inválido'
              // } }}
              />
              {/* <input
              id="phone"
              type="text"
              className={`form-control ${errors.phone && 'is-invalid'}`}
              {...register('phone', {
                required: "Campo obrigatório"
              })
              }
            /> */}
              <div className="invalid-feedback d-block">{errors.phone?.message}</div>
            </div>

            <div className="col-sm-12 col-md-6 form-group">
              <label className="user-form-label">Senha<i className="text-danger">*</i></label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className={`form-control ${errors.password && 'is-invalid'}`}
                {...register('password', {
                  required: "Campo obrigatório"
                })
                }
              />
              <div className="invalid-feedback d-block">{errors.password?.message}</div>
            </div>

            <div className="col-sm-12 col-md-6 form-group">
              <label className="user-form-label">Confirmar Senha<i className="text-danger">*</i></label>
              <input
                id="passwordConfirm"
                type={showPassword ? 'text' : 'password'}
                className={`form-control ${errors.passwordConfirm && 'is-invalid'}`}
                {...register('passwordConfirm',
                  {
                    required: "Campo obrigatório",
                    validate: value => value === password.current || 'As senhas são diferentes'
                  })
                }
              />
              <div className="invalid-feedback d-block">{errors.passwordConfirm?.message}</div>
            </div>

            <div className="col-12 mb-5">
              <div className="form-check ">
                <input className="form-check-input" type="checkbox" id="showPasswordCheck" onClick={() => setShowPassword(!showPassword)} />
                <label className="form-check-label" htmlFor="showPasswordCheck">
                  Mostrar senha</label>
              </div>
            </div>

            <div className="col-12">
              <button
                type="button"
                className="btn btn-gray mr-3"
                onClick={() => history.goBack()}
              >Voltar</button>
              <button
                type="submit"
                className="btn btn-sea-blue-2"
              >{formButton}</button>
            </div>
          </div>
        </form>
      </BaseContainer>
    </>
  );
}

export default UsersForm;

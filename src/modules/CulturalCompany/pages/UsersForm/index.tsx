import { useRef, useState } from "react";
import BaseContainer from "core/components/BaseContainer";
import { Controller, useForm } from "react-hook-form";
import './styles.scss';
import { User } from "core/models/User";
import { makePrivateRequest } from "core/utils/request";
import InputMask from "react-input-mask";

interface FormState {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  cpf: string;
  phone: string;
}

const UsersForm = () => {
  const { register, handleSubmit, formState: { errors }, watch, control } = useForm<FormState>();
  const [showPassword, setShowPassword] = useState(false);

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data: FormState) => {
    const user: User = { ...data, "user-type-id": 1 };
    makePrivateRequest({ method: 'DELETE', url: '/users/5', data: user }).then(console.log);
  }

  return (
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
              rules={{ required: 'Campo obrigatório', pattern:{
                value: /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/,
                message: 'CPF inválido'
              } }}
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
            <input
              id="phone"
              type="text"
              className={`form-control ${errors.phone && 'is-invalid'}`}
              {...register('phone', {
                required: "Campo obrigatório"
              })
              }
            />
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
                  validate: value => value === password.current || 'Confirmação de senha inválida'
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
              type="submit"
              className="btn btn-gray mr-3"
            >Voltar</button>
            <button
              type="submit"
              className="btn btn-sea-blue-2"
            >Adicionar usuário</button>
          </div>
        </div>
      </form>
    </BaseContainer>
  );
}

export default UsersForm;

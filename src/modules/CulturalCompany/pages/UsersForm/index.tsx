import { Button } from "antd";
import BaseContainer from "core/components/BaseContainer";
import React from "react";
import { useForm } from "react-hook-form";
import './styles.scss';

interface FormState {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  cpf: string;
  phone: string;
}

const UsersForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormState>();

  const onSubmit = (data: FormState) => {
    console.log(data);
  }

  return (
    <BaseContainer title="Administradores">
      <h2 className="sub-title mb-4">Novo Usuário</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">

          <div className="col-sm-12 col-md-6 form-group">
            <label>Nome</label>
            <input
              id="name"
              type="text"
              className={`form-control ${errors.name && 'is-invalid'}`}
              {...register('name', { required: "Campo obrigatório" })}
            />
            <div className="invalid-feedback d-block">{errors.name?.message}</div>
          </div>

          <div className="col-sm-12 col-md-6 form-group">
            <label className="user-form-label">CPF</label>
            <input
              id="cpf"
              type="text"
              className={`form-control ${errors.cpf && 'is-invalid'}`}
              {...register('cpf', {required: "Campo obrigatório"})
              }
            />
            <div className="invalid-feedback d-block">{errors.cpf?.message}</div>
          </div>
          <div className="col-sm-12 col-md-6 form-group">
            <label className="user-form-label">E-mail</label>
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
            <label className="user-form-label">Celular</label>
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
            <label className="user-form-label">Senha</label>
            <input
              id="password"
              type="text"
              className={`form-control ${errors.password && 'is-invalid'}`}
              {...register('password', {
                required: "Campo obrigatório"
              })
              }
            />
            <div className="invalid-feedback d-block">{errors.password?.message}</div>
          </div>

          <div className="col-sm-12 col-md-6 form-group">
            <label className="user-form-label">Confirmar Senha</label>
            <input
              id="passwordConfirm"
              type="text"
              className={`form-control ${errors.passwordConfirm && 'is-invalid'}`}
              {...register('passwordConfirm',
                {
                  required: "Campo obrigatório",
                })
              }
            />
            <div className="invalid-feedback d-block">{errors.passwordConfirm?.message}</div>
          </div>

        </div>

        <button
          type="submit"
          className="btn btn-sea-blue-2"
        >Entrar</button>

<Button type="primary">Button</Button>

      </form>
    </BaseContainer>
  );
}

export default UsersForm;

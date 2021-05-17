import React, { useState } from "react";
import BaseContainer from "core/components/BaseContainer";
import { Controller, useForm } from "react-hook-form";
import './styles.scss';
import { User } from "core/models/User";
import { makePrivateRequest } from "core/utils/request";
import { Button, createStyles, Grid, makeStyles, Paper, TextField, Theme } from "@material-ui/core";

interface FormState {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  cpf: string;
  phone: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);


const MaterialForm = () => {
  const classes = useStyles();
  const { handleSubmit, control } = useForm<FormState>();

  const onSubmit = (data: FormState) => {
    // const user: User = { ...data, "user-type-id": 1 };
    console.log(data);

    // makePrivateRequest({ method: 'PUT', url: '/users/4', data: user }).then(console.log);
  }

  return (
    <BaseContainer title="Administradores">
      <h2 className="sub-title mb-4">Novo Usuário</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="name"
              rules={{ required: 'Campo Obrigatório.' }}
              render={({ field: { onChange, onBlur, name }, fieldState: { invalid, error } }) => (
                <TextField
                  label="Nome"
                  error={invalid}
                  fullWidth
                  onChange={onChange}
                  onBlur={onBlur}
                  variant="outlined"
                  helperText={error?.message}
                  name={name}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>


          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Adicionar usuário
            </Button>
          </Grid>
        </Grid>
      </form>
    </BaseContainer>
  );
}

export default MaterialForm;

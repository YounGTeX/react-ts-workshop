import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useStyles } from './styles';
import { FormProvider, useForm } from 'react-hook-form';
import Input from '../../../components/Input';

interface SignUpProps {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

const Register = (): JSX.Element => {
  const classes = useStyles();
  const formMethods = useForm<SignUpProps>();
  const { handleSubmit } = formMethods;

  const onSubmit = () => {
    console.log('Submit');
  };

  return (
    <div className={classes.container}>
      <form className={classes.formContainer}>
        <div className={classes.header}>
          <Typography color='secondary' variant='h5'>
            Insira suas informações para o registro
          </Typography>
        </div>
        <FormProvider {...formMethods}>
          <Input variant='outlined' name='email' label='E-mail' required givenError='Insira seu nome' />
          <Input variant='outlined' name='password' label='Senha' required givenError='Insira sua senha' />
          <Input
            variant='outlined'
            name='confirmPassword'
            label='Confirme sua senha'
            required
            givenError='Insira sua confirmação de senha'
          />
        </FormProvider>
        <div className={classes.bottomContainer}>
          <Button className={classes.button} type='submit'>
            Cadastrar
          </Button>
          <NavLink className={classes.signIn} to='/auth/login'>
            <Typography variant='h6'>Já possuo uma conta</Typography>
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Register;

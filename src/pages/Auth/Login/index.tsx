import React, { useState } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useStyles } from './styles';
import { FormProvider, useForm } from 'react-hook-form';
import Input from '../../../components/Input';
import { useAuth } from '../../../hooks/Auth';
import { showAlert } from '../../../utils/showAlert';
import Loading from '../../../components/Loading';

interface FormCredentials {
  email: string;
  password: string;
}

const Login = (): JSX.Element => {
  const classes = useStyles();
  const formMethods = useForm<FormCredentials>();
  const { handleSubmit } = formMethods;
  const { state } = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: FormCredentials): Promise<void> => {
    try {
      setLoading(true);
      await signIn(data);
      navigate('/home/post', { state: {} });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showAlert({
        title: 'Ops...',
        icon: 'error',
        text: err.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container className={classes.container}>
      <Grid className={classes.left} item xs={6}>
        <Typography style={{ color: '#FFF' }} variant='h2'>
          Bem-vindo(a) ao KRUD!
        </Typography>
      </Grid>
      <Grid className={classes.right} item xs={6}>
        <form className={classes.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <Typography color='secondary' className={classes.header} variant='h5'>
            Insira suas credenciais
          </Typography>
          <FormProvider {...formMethods}>
            <Input
              variant='outlined'
              name='email'
              label='E-mail'
              required
              givenError='Insira seu endereço de e-mail'
              defaultValue={state ? (state as { email: string }).email : ''}
            />
            <Input
              variant='outlined'
              name='password'
              label='Senha'
              type='password'
              required
              givenError='Insira sua senha'
            />
          </FormProvider>
          <div className={classes.bottomContainer}>
            <Button className={classes.button} type='submit'>
              {loading ? <Loading loadingSize={16} /> : 'Entrar'}
            </Button>
            <NavLink className={classes.signUp} to='/auth/register'>
              <Typography variant='h6'>Ainda não possui conta?</Typography>
            </NavLink>
          </div>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;

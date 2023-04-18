import { Alert, Button, Grid, TextField } from '@mui/material';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { startLogin } from '../../store/auth/thunks';

const formValidations = {
  email: [(value) => value.length > 1, 'This field is required'],
  pass: [(value) => value.length > 1, 'This field is required'],
};
const formData = {
  email: '',
  pass: '',
};

export const Login = ({ active, setActive }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { status, errorMessage } = useSelector((state) => state.auth);
  const isChecking = useMemo(() => status === 'checking', [status]);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { email, pass, onInputChange, emailValid, passValid, formState } =
    useForm(formData, formValidations);

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const user = {
      email: formState.email,
      pass: formState.pass,
    };
    dispatch(startLogin(user));
    nav('vectorApp/home');
  };
  return (
    <form onSubmit={onSubmit}>
      <h1 className='text-3xl font-bold'>Welcome to Vectors</h1>
      <div className='flex flex-col items-center justify-center'>
        <div className='m-8 flex flex-col gap-6'>
          <div className='flex flex-col'>
            <TextField
              label='Email'
              type='text'
              placeholder='Email'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </div>
          <div className='flex flex-col'>
            <TextField
              label='Password'
              type='password'
              placeholder='Password'
              fullWidth
              name='pass'
              value={pass}
              onChange={onInputChange}
              error={!!passValid && formSubmitted}
              helperText={passValid}
            />
          </div>
        </div>
        <Grid container display={!!errorMessage ? '' : 'none'} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <Alert severity='error'>{errorMessage}</Alert>
          </Grid>
        </Grid>
        <Button
          disabled={isChecking}
          type='submit'
          variant='contained'
          fullWidth>
          Login
        </Button>
      </div>
    </form>
  );
};

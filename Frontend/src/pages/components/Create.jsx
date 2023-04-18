import { Alert, Button, Grid, TextField } from '@mui/material';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { registerUser } from '../../helpers/userAuth';
import { useForm } from '../../hooks/useForm';

const formData = {
  name: '',
  email: '',
  pass: '',
};

const formValidations = {
  name: [(value) => value.length > 1, 'field is required'],
  email: [(value) => value.includes('@'), 'incorrect formatting missing, @'],
  pass: [(value) => value.length >= 6, 'Must be longer than 6 characters'],
};
export const Create = ({ active, setActive }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { status, errorMessage } = useSelector((state) => state.auth);
  const isChecking = useMemo(() => status === 'checking', [status]);

  const {
    formState,
    name,
    email,
    pass,
    onInputChange,
    isformValid,
    nameValid,
    emailValid,
    passValid,
  } = useForm(formData, formValidations);
  const onSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!isformValid) return;
    const user = {
      name: formState.name,
      email: formState.email,
      pass: formState.pass,
      role: 'USER_ROLE',
    };
    await registerUser(user);
  };
  return (
    <div className='flex flex-col items-center justify-center'>
      <form
        onSubmit={onSubmit}
        className='flex flex-col items-center justify-center'>
        <h1 className='text-3xl font-bold'>Create an account</h1>
        <div className='m-8 flex flex-col gap-6'>
          <TextField
            label='Your name'
            type='text'
            placeholder='Password'
            name='name'
            value={name}
            onChange={onInputChange}
            error={!!nameValid && formSubmitted}
            helperText={nameValid}
          />
          <TextField
            label='Your email'
            type='text'
            placeholder='vector@gmail.com'
            name='email'
            value={email}
            onChange={onInputChange}
            error={!!emailValid && formSubmitted}
            helperText={emailValid}
          />
          <TextField
            label='Your password'
            type='password'
            placeholder='Password'
            name='pass'
            value={pass}
            onChange={onInputChange}
            error={!!passValid && formSubmitted}
            helperText={passValid}
          />
        </div>
        <Button
          disabled={isChecking}
          type='submit'
          variant='contained'
          fullWidth>
          Create
        </Button>
        <Grid item xs={8} display={!!errorMessage ? '' : 'none'}>
          <Alert severity='error'>{errorMessage}</Alert>
        </Grid>
        <div className='flex-r mt-3 flex '>
          <p className='m-1 text-black opacity-70'>
            do you have an account?
            <button
              className='m-1 text-blue-600'
              onClick={() => setActive(!active)}>
              Sign here
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

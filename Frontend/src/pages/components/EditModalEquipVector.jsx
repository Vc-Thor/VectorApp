import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  deleteVector,
  postValueVector,
  putVector,
} from '../../helpers/userAuth';
import { useForm } from '../../hooks/useForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const formValidations = {
  name: [(value) => value.length > 1, 'This field is required'],
  area: [(value) => value.length > 1, 'This field is required'],
  activity: [(value) => value.length > 1, 'This field is required'],
  value: [(value) => value.length > 1, 'This field is required'],
  period: [(value) => value.length > 1, 'This field is required'],
};
const formData = {
  name: '',
  area: '',
  activity: '',
  value: '',
  period: '',
};

export const EditModalEquipVector = (datas) => {
  const [open, setOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [message, setMessage] = useState({
    error: '',
    msgs: '',
  });
  const [data, setData] = useState(47);
  const { token } = useSelector((state) => state.auth);
  const {
    name,
    area,
    activity,
    value,
    period,
    onInputChange,
    nameValid,
    areaValid,
    activityValid,
    valueValid,
    periodValid,
    formState,
  } = useForm(formData, formValidations);

  const vectorUpdate = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const vectorUp = {
      name: formState.name,
      area: formState.area,
      activity: formState.activity,
    };
    const { msg, errorMessage } = await putVector(
      datas.datas._id,
      token,
      vectorUp,
    );
    setMessage({
      error: errorMessage,
      msgs: msg,
    });
  };
  const onDeleteVector = async () => {
    const { errorMessage, msg } = await deleteVector(token, datas.datas);
    setMessage({
      error: errorMessage,
      msgs: msg,
    });
  };
  const valueOnSumit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const valueVector = {
      period: formState.period,
      value: formState.value,
      area: formState.area || datas.datas.area,
      vector: datas.datas._id,
      position: data,
    };
    const { msg, errorMessage, position } = await postValueVector(
      valueVector,
      token,
    );
    setData(position);
    setMessage({
      error: errorMessage,
      msgs: msg,
    });
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setData(-47);
  };
  return (
    <div>
      <IconButton onClick={handleOpen} color='warning'>
        <EditIcon fontSize='small' />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style, width: 800 }}>
          <div className='flex justify-end'>
            <button onClick={handleClose}>
              <div
                className={`m-1 h-1 w-5 translate-y-1 -rotate-45 rounded-md bg-black`}
              />
              <div
                className={`m-1 h-1 w-5 -translate-y-1 rotate-45 rounded-md bg-black`}
              />
            </button>
          </div>
          <div>
            <h2 className='text-center text-2xl font-semibold'>
              Update Equip Vector
            </h2>
            <div>
              <form onSubmit={vectorUpdate}>
                <div className='mt-8 flex justify-center gap-6'>
                  <TextField
                    label='Vector Name'
                    variant='outlined'
                    color='primary'
                    name='name'
                    value={name || datas.datas.name}
                    onChange={onInputChange}
                    error={!!nameValid && formSubmitted}
                    helperText={nameValid}
                  />
                  <TextField
                    label='Area'
                    variant='outlined'
                    color='primary'
                    name='area'
                    value={area || datas.datas.area}
                    onChange={onInputChange}
                    error={!!areaValid && formSubmitted}
                    helperText={areaValid}
                  />
                  <TextField
                    label='Activity'
                    variant='outlined'
                    color='primary'
                    name='activity'
                    value={activity || datas.datas.activity}
                    onChange={onInputChange}
                    error={!!activityValid && formSubmitted}
                    helperText={activityValid}
                  />
                </div>
                <Grid
                  container
                  display={!!message ? '' : 'none'}
                  sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                  <Grid item xs={6}>
                    {!!message.error ? (
                      <Alert severity='error'>{message.error}</Alert>
                    ) : (
                      <Alert severity='success'>{message.msgs}</Alert>
                    )}
                  </Grid>
                </Grid>
                <div className='mt-8 flex justify-center gap-6'>
                  <Button variant='contained' color='warning' type='submit'>
                    Modify
                  </Button>
                  <Button
                    variant='contained'
                    color='error'
                    onClick={onDeleteVector}>
                    Delete
                  </Button>
                </div>
              </form>
              <form onSubmit={valueOnSumit}>
                <div className='mt-8 flex justify-center gap-6'>
                  <TextField
                    label='Vector Value'
                    variant='outlined'
                    color='primary'
                    name='value'
                    value={value}
                    onChange={onInputChange}
                    error={!!valueValid && formSubmitted}
                    helperText={valueValid}
                  />
                  <TextField
                    label='Period'
                    variant='outlined'
                    color='primary'
                    name='period'
                    value={period}
                    onChange={onInputChange}
                    error={!!periodValid && formSubmitted}
                    helperText={periodValid}
                  />
                  <Button
                    type='submit'
                    variant='contained'
                    onClick={() => setData(data + 47)}>
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

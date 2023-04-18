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

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  deleteVector,
  getValueVectorById,
  getVectors,
  postValueVector,
  postVector,
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

export const ModalEquipVector = ({
  activeIcon,
  newVector,
  valueVector,
  uid,
}) => {
  const [open, setOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [vectorValue, setVectorValue] = useState([]);
  const [vector, setVector] = useState();
  const [message, setMessage] = useState({
    error: '',
    msgs: '',
  });
  const [valid, setValid] = useState(false);
  const [id, setId] = useState('');
  const [data, setData] = useState(-47);
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
    isformValid,
  } = useForm(formData, formValidations);
  const vectorOnSumit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!!isformValid) return;
    const vector = {
      name: formState.name,
      area: formState.area,
      activity: formState.activity,
      position: 0,
    };
    const { msg, errorMessage, _id, ok } = await postVector(vector, token);
    ok === true ? setValid(true) : setValid(false);
    setId(_id);
    setData(-47);
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
      area: formState.area,
      vector: id,
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
  const vectorUpdate = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const vectorUp = {
      name: formState.name,
      area: formState.area,
      activity: formState.activity,
    };
    const { msg, errorMessage } = await putVector(id, token, vectorUp);
    setMessage({
      error: errorMessage,
      msgs: msg,
    });
  };
  const onDeleteVector = async () => {
    const { errorMessage, msg } = await deleteVector(token, id);
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
    setValid(false);
    setVector([]);
  };
  useEffect(() => {
    getVectors(token).then(({ vectors }) => setVector(vectors));
    getValueVectorById(token, id).then(({ valueVectors }) =>
      setVectorValue(valueVectors),
    );
  }, [data]);
  return (
    <div>
      {activeIcon === true ? (
        <IconButton color='warning' onClick={handleOpen}>
          <EditIcon fontSize='small' />
        </IconButton>
      ) : (
        <button
          className={` text-white ${open ? 'bg-blue-800 px-18' : ''}`}
          onClick={handleOpen}>
          Equip Vector
        </button>
      )}

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
            <h2 className='text-center text-2xl font-semibold'>Equip Vector</h2>
            <div>
              <form onSubmit={valid === true ? vectorUpdate : vectorOnSumit}>
                <div className='mt-8 flex justify-center gap-6'>
                  <TextField
                    label='Vector Name'
                    variant='outlined'
                    color='primary'
                    name='name'
                    value={name}
                    onChange={onInputChange}
                    error={!!nameValid && formSubmitted}
                    helperText={nameValid}
                  />
                  <TextField
                    label='Area'
                    variant='outlined'
                    color='primary'
                    name='area'
                    value={area}
                    onChange={onInputChange}
                    error={!!areaValid && formSubmitted}
                    helperText={areaValid}
                  />
                  <TextField
                    label='Activity'
                    variant='outlined'
                    color='primary'
                    name='activity'
                    value={activity}
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
                  <Button variant='contained' type='submit'>
                    Save
                  </Button>
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
              <div className='mt-8 grid justify-items-center gap-6 border border-blue-800 p-3 '>
                <div className='grid grid-cols-2 grid-rows-2 justify-items-center gap-6'>
                  <div className=' col-1 row-span-2 grid content-center'>
                    {vector
                      ?.filter((x) => x._id === id)
                      .map((x) => (
                        <h1 key={x._id}>{x.name}</h1>
                      ))}
                  </div>
                  <div className='col-2 row-1 grid grid-flow-col gap-6'>
                    {vectorValue.map((x) => (
                      <h1 key={x._id} className='text-base font-semibold'>
                        {x.period}
                      </h1>
                    ))}
                  </div>
                  <div className='col-2 row-2 grid  grid-flow-col gap-6'>
                    {vectorValue.map((x) => (
                      <button key={x._id}>{x.value}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

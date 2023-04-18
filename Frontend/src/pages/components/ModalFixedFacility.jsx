import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from '@mui/material';
import { useState } from 'react';

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

export const ModalFixedFacility = ({ activeBar }) => {
  const [open, setOpen] = useState(false);
  const [criteria, setCriteria] = useState('');
  const handleChange = (event) => {
    setCriteria(event.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <button
        className={` text-white ${open ? 'bg-blue-800 px-18' : ''}`}
        onClick={handleOpen}>
        Fixed Facility
      </button>
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
              Fixed Facility
            </h2>
            <div className='mt-5 grid grid-cols-5 gap-3'>
              <TextField
                label='Vector Name'
                variant='outlined'
                color='secondary'
              />
              <Box sx={{ width: 120 }}>
                <FormControl fullWidth>
                  <InputLabel color='secondary'>Criteria</InputLabel>
                  <Select
                    value={criteria}
                    label='Criteria'
                    onChange={handleChange}
                    color='secondary'>
                    <MenuItem value={'m3/kW'}>m3/kW</MenuItem>
                    <MenuItem value={'cfm/HP'}>cfm/HP</MenuItem>
                    <MenuItem value={'m/s'}>m/s</MenuItem>
                    <MenuItem value={'ft/m'}>ft/m</MenuItem>
                    <MenuItem value={'Fix Q'}>Fix Q</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <div className='flex flex-row items-start'>
                <TextField
                  label='Power Input'
                  variant='outlined'
                  color='secondary'
                />
                <h1 className='ml-1 text-center font-semibold'>kW</h1>
              </div>
              <div className='flex flex-col'>
                <div className='mb-2 flex flex-row items-center'>
                  <TextField
                    label='Air Velocity'
                    variant='outlined'
                    color='secondary'
                  />
                  <h1 className='ml-1 text-center font-semibold'>M3/s</h1>
                </div>
                <TextField
                  label='Area m2'
                  variant='outlined'
                  color='secondary'
                />
              </div>
              <TextField
                label='Vector Name'
                variant='outlined'
                color='secondary'
              />
              <div className='col-span-3 row-start-2 grid max-w-full grid-cols-3 gap-3'>
                <Box sx={{ width: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel color='secondary'>Area</InputLabel>
                    <Select
                      value={criteria}
                      label='Area'
                      onChange={handleChange}
                      color='secondary'>
                      <MenuItem value={'m3/kW'}>m3/kW</MenuItem>
                      <MenuItem value={'cfm/HP'}>cfm/HP</MenuItem>
                      <MenuItem value={'m/s'}>m/s</MenuItem>
                      <MenuItem value={'ft/m'}>ft/m</MenuItem>
                      <MenuItem value={'Fix Q'}>Fix Q</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ width: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel color='secondary'>Sub Area</InputLabel>
                    <Select
                      value={criteria}
                      label='Sub Area'
                      onChange={handleChange}
                      color='secondary'>
                      <MenuItem value={'m3/kW'}>m3/kW</MenuItem>
                      <MenuItem value={'cfm/HP'}>cfm/HP</MenuItem>
                      <MenuItem value={'m/s'}>m/s</MenuItem>
                      <MenuItem value={'ft/m'}>ft/m</MenuItem>
                      <MenuItem value={'Fix Q'}>Fix Q</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ width: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel color='secondary'>Activity</InputLabel>
                    <Select
                      value={criteria}
                      label='Activity'
                      onChange={handleChange}
                      color='secondary'>
                      <MenuItem value={'m3/kW'}>m3/kW</MenuItem>
                      <MenuItem value={'cfm/HP'}>cfm/HP</MenuItem>
                      <MenuItem value={'m/s'}>m/s</MenuItem>
                      <MenuItem value={'ft/m'}>ft/m</MenuItem>
                      <MenuItem value={'Fix Q'}>Fix Q</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

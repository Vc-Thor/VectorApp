import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { ModalEquipVector, ModalFixedFacility } from './';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/auth/authSlice';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useState } from 'react';
import { startLogin } from '../../store/auth/thunks';

export const SideBar = () => {
  const { name, email } = useSelector((state) => state.auth);
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const nav = useNavigate();
  const MySwal = withReactContent(Swal);
  const onClickLogout = () => {
    dispatch(logout());
    nav('/login');
  };
  const newAlert = () => {
    MySwal.fire({
      title: 'Enter your password for log back in!!',
      input: 'password',
      inputPlaceholder: 'Enter your password',
      inputAttributes: {
        maxlength: 25,
        autocapitalize: 'off',
        autocorrect: 'off',
      },
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        setPassword(result.value);
        const user = {
          email: email,
          pass: password,
        };
        dispatch(startLogin(user));
        console.log(user);
        MySwal.fire({ title: 'Complete recharge', icon: 'success' });
      }
    });
  };
  console.log(password);
  return (
    <div className='flex min-h-screen w-2/12 flex-col items-center bg-blue-900'>
      <div className='flex w-full flex-row justify-center bg-blue-700'>
        <IconButton color='error' onClick={onClickLogout}>
          <LogoutIcon />
        </IconButton>
        <h1 className='text-center text-2xl font-semibold text-white'>
          {name}
        </h1>
      </div>
      <h1 className='mt-6 text-4xl font-bold text-white'>Menu</h1>
      <div className='mt-5 min-w-full border-solid border-white '>
        <div className='min-w-full'>
          <Link
            to='home'
            className='flex justify-center text-center text-xl font-semibold text-white'>
            Vectors
          </Link>
          <div className='flex w-full flex-col items-center'>
            <ModalEquipVector />
            <ModalFixedFacility />
            <button className='px-18 text-white'>Section</button>
          </div>
        </div>
        <div className='mt-3'>
          <h1 className='text-center text-xl font-bold text-white'>Area</h1>
          <div className='flex flex-col'>
            <button className='px-18 text-white'>Create</button>
            {/* //? A single element will be created that creates and modifies data */}
          </div>
        </div>
        <div className='mt-3'>
          <h1 className='text-center text-xl font-bold text-white'>
            Intake Return
          </h1>
          <div className='flex flex-col'>
            <button className='px-18 text-white'>Create</button>{' '}
            {/* //? A single element will be created that creates and modifies data */}
          </div>
        </div>
      </div>
      <div className='mt-3'>
        <h1 className='text-center text-xl font-bold text-white '>Graphs</h1>
        <div className='flex flex-col'>
          <NavLink
            to='/vectorApp/globalgraphs'
            className='flex justify-center text-sm text-white'>
            Global
          </NavLink>
          <NavLink
            to='/vectorApp/areagraphs'
            className='flex justify-center text-sm text-white'>
            Area Q
          </NavLink>
          <button className='text-sm text-white'>Intake/Return Q</button>
          <button className='text-sm text-white'>Area Relations</button>
        </div>
      </div>
      <div className=''>
        <h1 className='mt-5 text-center text-xl font-bold text-white'>Units</h1>
        <div className='flex flex-col'>
          <button className='text-sm text-white'>Airflow</button>
          <button className='text-sm text-white'>Air Velocity</button>
        </div>
      </div>
      <div className='mt-5'>
        <h1 className='text-center text-xl font-bold text-white'>Settings</h1>
        <div className='flex flex-col'>
          <button className='text-white'>Leakage</button>
        </div>
        <div className='flex flex-col'>
          <button onClick={newAlert} className='text-white'>
            prueba
          </button>
        </div>
      </div>
    </div>
  );
};

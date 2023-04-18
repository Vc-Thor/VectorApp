import JWT from 'jwt-decode';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/auth/authSlice';

export const Contador = () => {
  const [tiempoRestante, setTiempoRestante] = useState(0);
  const [tokenRefrescado, setTokenRefrescado] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { exp } = JWT(token);
  const dispatch = useDispatch();

  useEffect(() => {
    const intervalo = setInterval(() => {
      const ahora = Math.floor(Date.now() / 1000);
      setTiempoRestante(exp - ahora);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [exp]);

  useEffect(() => {
    if (tiempoRestante <= 600) {
      // 600 segundos = 10 minutos
      if (tiempoRestante <= 0) {
        // dispatch(logout());
      } else if (tiempoRestante <= 60 && !tokenRefrescado) {
        setTokenRefrescado(true);
      }
    } else {
      setTokenRefrescado(false);
    }
  }, [tiempoRestante, tokenRefrescado, dispatch]);

  const formatearTiempo = (tiempo) => {
    const horas = Math.floor(tiempo / 3600);
    const minutos = Math.floor((tiempo % 3600) / 60);
    const segundos = tiempo % 60;
    return `${horas.toString().padStart(2, '0')}:${minutos
      .toString()
      .padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  };

  const tiempoFormateado = formatearTiempo(tiempoRestante);

  return (
    <div className='absolute bottom-3 left-16'>
      <h1 className='text-xl text-white'>{tiempoFormateado}</h1>
    </div>
  );
};

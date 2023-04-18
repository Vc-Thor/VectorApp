import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { SignIn } from '../pages';
import { AuthenticatedRoutes } from './AuthenticatedRoutes';

export const VectorRoutes = () => {
  const { status } = useSelector((state) => state.auth);

  return (
    <>
      <Routes>
        {status === 'authenticated' ? (
          <Route path='/vectorApp/*' element={<AuthenticatedRoutes />} />
        ) : (
          <Route path='/*' element={<SignIn />} />
        )}
      </Routes>
    </>
  );
};

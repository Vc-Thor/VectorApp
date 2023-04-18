import { Route, Routes } from 'react-router-dom';
import { AreaGraphs, GlobalGraphs, Home } from '../pages';
import { SideBar } from '../pages/components/SideBar';
import { Contador } from '../pages/components/Contador';

export const AuthenticatedRoutes = () => {
  return (
    <div className='flex w-screen flex-row'>
      <SideBar />
      <Contador />
      <Routes>
        <Route path='globalgraphs' element={<GlobalGraphs />} />
        <Route path='home' element={<Home />} />
        <Route path='areagraphs' element={<AreaGraphs />} />
      </Routes>
    </div>
  );
};

import { useState } from 'react';
import { DraggableTable } from './components';
import { DraggableTableArea } from './components/DraggableTableArea';

export const Home = () => {
  const [active, setActive] = useState(true);
  return (
    <div className='flex w-full flex-row justify-center'>
      <div className='flex min-w-full flex-col p-5'>
        <div className='flex flex-col items-center'>
          <h1 className='mt-10 text-center text-4xl font-bold text-black'>
            Vector Calculator
          </h1>
        </div>
        <div className='flex flex-col items-end '>
          <div className='mt-10 mr-32 flex min-w-min flex-row rounded-md border border-solid border-blue-800'>
            <button
              className='rounded-l-md border-r-2 border-solid bg-blue-800 p-3 text-white'
              onClick={() => setActive(true)}>
              Global
            </button>
            <p className='p-3'>{active ? 'Global' : 'Area'}</p>
            <button
              className='rounded-r-md border-l-2 border-solid bg-blue-800 p-3 text-white'
              onClick={() => setActive(false)}>
              Area
            </button>
          </div>
        </div>
        <div className=' mt-5 max-h-screen rounded-md border-2 border-solid border-blue-800'>
          {active ? <DraggableTable /> : <DraggableTableArea />}
        </div>
      </div>
    </div>
  );
};

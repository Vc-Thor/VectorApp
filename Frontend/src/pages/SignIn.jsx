import { useState } from 'react';
import { Create, Login } from './components';

export const SignIn = () => {
  const [active, setActive] = useState(true);

  return (
    <div className='mt-20 flex h-full flex-col items-center justify-center'>
      <div className='flex flex-col items-center justify-center rounded-md border border-solid border-blue-800 p-9'>
        {!active ? (
          <Create active={active} setActive={setActive} />
        ) : (
          <Login active={active} setActive={setActive} />
        )}
      </div>
    </div>
  );
};

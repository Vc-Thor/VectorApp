import { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { useSelector } from 'react-redux';
import { getVectorsValue } from '../../helpers/userAuth';

export const DraggableTableArea = () => {
  const { token } = useSelector((state) => state.auth);
  const [valueVector, setValueVector] = useState([]);
  const [state, setState] = useState({
    activeDrags: 0,
    deltaPosition: {
      x: 47,
      y: 47,
    },
  });
  const onStart = () => {
    setState({
      activeDrags: ++state.activeDrags,
      deltaPosition: {
        x: state.deltaPosition.x,
        y: state.deltaPosition.y,
      },
    });
  };
  const onStop = () => {
    setState({
      activeDrags: --state.activeDrags,
      deltaPosition: {
        x: state.deltaPosition.x,
        y: state.deltaPosition.y,
      },
    });
  };

  const areas = [...new Set(valueVector.map((valVec) => valVec.area))];

  const newArea = areas.map((area) => {
    const filteredValues = valueVector.filter((valVec) => valVec.area === area);
    const newValueVector = {};
    filteredValues.forEach((valVector) => {
      if (newValueVector[valVector.position]) {
        newValueVector[valVector.position].push(valVector.value);
      } else {
        newValueVector[valVector.position] = [valVector.value];
      }
    });
    const values = Object.keys(newValueVector).map((position) => {
      const nums = newValueVector[position];
      const sum = nums.reduce((total, num) => total + num, 0);
      return { position: parseInt(position), value: sum };
    });
    const totalAreaValue = values.reduce((total, val) => total + val.value, 0);
    return { newArea: area, value: values, total: totalAreaValue };
  });
  const newValueVector = {};
  valueVector.forEach((valVector) => {
    if (newValueVector[valVector.position]) {
      newValueVector[valVector.position].push(valVector.value);
    } else {
      newValueVector[valVector.position] = [valVector.value];
    }
  });
  const result = Object.keys(newValueVector).map((position) => {
    const values = newValueVector[position];
    const sum = values.reduce((total, value) => total + value, 0);
    return { position: parseInt(position), value: sum };
  });

  useEffect(() => {
    getVectorsValue(token).then(({ valueVectors }) =>
      setValueVector(valueVectors),
    );
  }, [state]);
  const dragHandlres = { onStart, onStop };
  return (
    <div className='flex flex-col p-3 '>
      <div className='flex flex-row p-3'>
        <div className='flex w-1/6 flex-col'>
          <div className='mb-3'>
            <h1 className='text-2xl text-black'>Vector Name</h1>
          </div>
          {newArea.map((d) => (
            <div key={d.newArea} className='flex flex-row justify-around'>
              <h1 key={d.newArea} className='py-1pt text-lg font-semibold'>
                {d.newArea}
              </h1>
            </div>
          ))}
        </div>
        <div className='ml-12 flex w-full flex-col'>
          <div className='mb-3'>
            <h1 className='text-2xl'>Requirement Vector</h1>
          </div>
          <div className=' overflow-scroll'>
            {newArea.map((d) => (
              <Draggable
                disabled={true}
                bounds={{ left: 0 }}
                id={d.newArea}
                key={d.newArea}
                axis='x'
                grid={[47, 60]}
                {...dragHandlres}>
                <div
                  id={d.total}
                  key={d.newArea}
                  className=' mt-7xl w-mc rounded-20xl border-10xl border-blue-800 p-1'>
                  {d.value.map((v) => (
                    <button
                      disabled={true}
                      key={v.position}
                      value={v.value}
                      className='ml-10xl mr-10xl border border-white'>
                      {v.value}
                    </button>
                  ))}
                </div>
              </Draggable>
            ))}
          </div>
        </div>
      </div>
      <div className='mt-3 h-1 max-w-screen-2xl bg-blue-800' />
      <div className='flex flex-row'>
        <h1 className='ml-5 text-lg font-semibold'>Result</h1>
        <div className='ml-52'>
          {result.map((x) => (
            <button className='ml-5' key={x.position}>
              {0 || x.value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

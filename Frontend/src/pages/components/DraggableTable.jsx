import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { useSelector } from 'react-redux';
import {
  deleteVector,
  getVectors,
  getVectorsValue,
  putValueVector,
  putVector,
} from '../../helpers/userAuth';
import { EditModalEquipVector } from './EditModalEquipVector';

export const DraggableTable = () => {
  const { token } = useSelector((state) => state.auth);
  const [setMessage] = useState({
    error: '',
    msgs: '',
  });
  const [vector, setVector] = useState([]);
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
  const handleDrag = (e, ui) => {
    const uidV = e.target.id;
    setState({
      deltaPosition: {
        x: ui.x,
        y: ui.y + ui.deltaY,
      },
    });
    const newpos = { position: ui.x };
    const idPos = valueVector
      .filter((x) => x.vector === uidV)
      .map((x) => x._id);
    const pos = valueVector
      .filter((x) => x.vector === uidV)
      .map((x) => x.position);

    for (let a = 0; a < pos.length; a++) {
      pos[a] += ui.deltaX;
    }
    for (let i = 0; i < pos.length; i++) {
      const id = idPos[i];
      const newValor = pos[i];
      const valor = { position: newValor };
      putValueVector(id, valor, token);
    }
    putVector(uidV, token, newpos);
  };
  const newValueVector = {};
  valueVector?.forEach((valVector) => {
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
  const onDeleteVector = async (id) => {
    const { errorMessage, msg } = await deleteVector(token, id);
    setMessage({
      error: errorMessage,
      msgs: msg,
    });
  };
  useEffect(() => {
    getVectors(token).then(({ vectors }) => setVector(vectors));
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
          {vector?.map((d) => (
            <div key={d._id} className='flex flex-row justify-around'>
              <h1 key={d._id} className='py-1pt text-lg font-semibold'>
                {d.name}
              </h1>
              <IconButton color='warning'>
                <EditModalEquipVector datas={d} />
              </IconButton>
              <IconButton color='error' onClick={() => onDeleteVector(d._id)}>
                <DeleteIcon fontSize='small' />
              </IconButton>
            </div>
          ))}
        </div>
        <div className='ml-12 flex w-full flex-col'>
          <div className='mb-3'>
            <h1 className='text-2xl'>Requirement Vector</h1>
          </div>
          <div className=' overflow-scroll'>
            {vector?.map((d) => (
              <Draggable
                defaultPosition={{ x: d.position, y: 0 }}
                bounds={{ left: 0 }}
                id={d._id}
                key={d._id}
                axis='x'
                onDrag={handleDrag}
                grid={[47, 60]}
                {...dragHandlres}>
                <div
                  id={d._id}
                  key={d._id}
                  className=' mt-7xl w-mc rounded-20xl border-10xl border-blue-800 p-1'>
                  {valueVector
                    .filter((x) => x.vector === d._id)
                    .map((v) => (
                      <button
                        disabled={true}
                        key={v._id}
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

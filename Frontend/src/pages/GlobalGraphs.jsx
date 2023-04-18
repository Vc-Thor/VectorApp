import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { getVectorsValue } from '../helpers/userAuth';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Global Vector',
    },
  },
};

export const GlobalGraphs = () => {
  const { token } = useSelector((state) => state.auth);
  const [valueVector, setValueVector] = useState([]);

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
  const perdiodoRepetido = valueVector.map((x) => x.period);
  const noRepetidos = Array.from(new Set(perdiodoRepetido));
  const data = {
    labels: noRepetidos,
    datasets: [
      {
        fill: true,
        label: 'Global Vector',
        data: result.map((x) => x.value),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  useEffect(() => {
    getVectorsValue(token).then(({ valueVectors }) =>
      setValueVector(valueVectors),
    );
  }, []);

  return (
    <div className='flex w-4/5 flex-col items-center'>
      <h1 className='mt-24 text-4xl font-semibold '>Global Graphs</h1>
      <Line className='mt-4' options={options} data={data} />
    </div>
  );
};

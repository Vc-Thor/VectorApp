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

export const AreaGraphs = () => {
  const { token } = useSelector((state) => state.auth);
  const [valueVector, setValueVector] = useState([]);
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
  const generarColorAleatorio = () => {
    const hexColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${'0'.repeat(6 - hexColor.length)}${hexColor}80`;
  };
  const perdiodoRepetido = valueVector.map((x) => x.period);
  const noRepetidos = Array.from(new Set(perdiodoRepetido));
  const data = {
    labels: noRepetidos,
    datasets: newArea.map((x) => ({
      fill: true,
      label: x.newArea,
      data: x.value.map((s) => s.value),
      backgroundColor: generarColorAleatorio(),
    })),
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };
  useEffect(() => {
    getVectorsValue(token).then(({ valueVectors }) =>
      setValueVector(valueVectors),
    );
  }, []);

  return (
    <div className='flex w-4/5 flex-col items-center'>
      <h1 className='mt-24 text-4xl font-semibold '>Area Graphs</h1>
      <Line className='mt-4' options={options} data={data} />
    </div>
  );
};

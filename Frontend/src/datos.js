export const vcamiones = [
  {
    id: 1,
    model: 'Iveco',
    vectores: [
      {
        id: 1,
        valor: 123,
        position: 0,
      },
      {
        id: 2,
        valor: 234,
        position: 60,
      },
      {
        id: 3,
        valor: 435,
        position: 120,
      },
      {
        id: 4,
        valor: 412,
        position: 180,
      },
      {
        id: 5,
        valor: 415,
        position: 240,
      },
    ],
  },
  {
    id: 2,
    model: 'Volvo',
    vectores: [
      {
        id: 1,
        valor: 124,
        position: 0,
      },
      {
        id: 2,
        valor: 345,
        position: 60,
      },
      {
        id: 3,
        valor: 456,
        position: 120,
      },
      {
        id: 4,
        valor: 123,
        position: 180,
      },
      {
        id: 5,
        valor: 234,
        position: 240,
      },
    ],
  },
  {
    id: 3,
    model: 'Mercedez',
    vectores: [
      {
        id: 1,
        valor: 345,
        position: 0,
      },
      {
        id: 2,
        valor: 123,
        position: 60,
      },
      {
        id: 3,
        valor: 235,
        position: 120,
      },
      {
        id: 4,
        valor: 456,
        position: 180,
      },
      {
        id: 5,
        valor: 457,
        position: 240,
      },
    ],
  },
  {
    id: 4,
    model: 'Scania',
    vectores: [
      {
        id: 1,
        valor: 345,
        position: 0,
      },
      {
        id: 2,
        valor: 123,
        position: 0,
      },
      {
        id: 3,
        valor: 235,
        position: 0,
      },
      {
        id: 4,
        valor: 456,
        position: 0,
      },
      {
        id: 5,
        valor: 457,
        position: 0,
      },
    ],
  },
  {
    id: 5,
    model: 'Wolksvagen',
    vectores: [
      {
        id: 1,
        valor: 345,
        position: 0,
      },
      {
        id: 2,
        valor: 123,
        position: 60,
      },
      {
        id: 3,
        valor: 235,
        position: 120,
      },
      {
        id: 4,
        valor: 456,
        position: 180,
      },
      {
        id: 5,
        valor: 457,
        position: 240,
      },
      {
        id: 6,
        valor: 457,
        position: 300,
      },
      {
        id: 7,
        valor: 457,
        position: 360,
      },
    ],
  },
  {
    id: 6,
    model: 'Wolksvagen',
    vectores: [
      {
        id: 1,
        valor: 345,
        position: 0,
      },
      {
        id: 2,
        valor: 123,
        position: 60,
      },
      {
        id: 3,
        valor: 235,
        position: 120,
      },
      {
        id: 4,
        valor: 456,
        position: 180,
      },
      {
        id: 5,
        valor: 457,
        position: 240,
      },
      {
        id: 6,
        valor: 457,
        position: 300,
      },
      {
        id: 7,
        valor: 457,
        position: 360,
      },
    ],
  },
  {
    id: 7,
    model: 'Wolksvagen',
    vectores: [
      {
        id: 1,
        valor: 345,
        position: 0,
      },
      {
        id: 2,
        valor: 123,
        position: 60,
      },
      {
        id: 3,
        valor: 235,
        position: 120,
      },
      {
        id: 4,
        valor: 456,
        position: 180,
      },
      {
        id: 5,
        valor: 457,
        position: 240,
      },
      {
        id: 6,
        valor: 457,
        position: 300,
      },
      {
        id: 7,
        valor: 457,
        position: 360,
      },
    ],
  },
];
export const truck = () => {
  const tvector = [];
  vcamiones.map((cv) => {
    const arr = {
      name: cv.model,
      id: cv.id,
      vector: cv.vectores,
    };
    tvector.push(arr);
  });
  return tvector;
};

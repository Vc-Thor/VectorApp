const { request, response } = require('express');
const { VectorValue } = require('../models');

const valueVectorGets = async (req = request, res = response) => {
  const query = { state: true };
  const [total, valueVectors] = await Promise.all([
    VectorValue.countDocuments(query),
    VectorValue.find(query).populate().populate(),
  ]);
  res.json({ total, valueVectors });
};
const valueVectorGetById = async (req = request, res = response) => {
  const { id } = req.params;
  const value = await VectorValue.findById(id)
    .populate('user', 'name')
    .populate('vector', 'name');
  res.json(value);
};
const valueVectorGetByIdVector = async (req = request, res = response) => {
  const { id } = req.params;
  const query = { state: true };
  const value = { vector: id };
  const [total, valueVectors] = await Promise.all([
    VectorValue.countDocuments(query),
    VectorValue.find(value).populate().populate(),
  ]);
  res.json({ total, valueVectors });
};
const valueVectorPost = async (req = request, res = response) => {
  const { state, user, ...body } = req.body;
  const period = req.body.period.toUpperCase();
  const area = req.body.area.toUpperCase();
  //   const valueDB = await VectorValue.findOne({ period });
  //   if (valueDB) {
  //     return res.status(400).json({
  //       msg: `The period '${period}' already exists`,
  //     });
  //   }
  const data = {
    ...body,
    period,
    area,
    user: req.user._id,
  };
  const valueV = new VectorValue(data);
  await valueV.save();
  res.status(201).json({
    msg: 'Value of the aggregate vector correctly',
    valueV,
  });
};
const valueVectorPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { state, ...data } = req.body;
  if (data.period) {
    data.period = data.period.toUpperCase();
  }
  data.user = req.user._id;
  const value = await VectorValue.findByIdAndUpdate(id, data);
  res.json({
    msg: 'Correctly updated data.',
    value,
  });
};
const valueVectorDelete = async (req = request, res = response) => {
  const { id } = req.params;
  const valueRemoved = await VectorValue.findByIdAndUpdate(id, {
    state: false,
  });
  res.json({ msg: 'Vector successfully removed.', valueRemoved });
};

module.exports = {
  valueVectorGetByIdVector,
  valueVectorGets,
  valueVectorGetById,
  valueVectorPost,
  valueVectorPut,
  valueVectorDelete,
};

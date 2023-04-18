const { request, response } = require('express');
const { Vector } = require('../models');

const vectorGets = async (req = request, res = response) => {
  const query = { state: true };
  const [total, vectors] = await Promise.all([
    Vector.countDocuments(query),
    Vector.find(query).populate('user', 'name'),
  ]);
  res.json({ total, vectors });
};
const vectorGetById = async (req = request, res = response) => {
  const { id } = req.params;
  const vector = await Vector.findById(id).populate('user', 'name');
  res.json(vector);
};
const vectorPost = async (req = request, res = response) => {
  const { area, activity, position } = req.body;
  const name = req.body.name.toUpperCase();
  const vectorDB = await Vector.findOne({ name });
  if (vectorDB) {
    return res.status(400).json({
      msg: `The vector '${vectorDB.name}' already exists`,
    });
  }
  const data = {
    name,
    area,
    activity,
    user: req.user._id,
    position,
  };
  const vector = new Vector(data);
  await vector.save();
  res.status(201).json({
    msg: 'Vector added correctly.',
    vector,
  });
};
const vectorPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { state, ...data } = req.body;
  data.name = data?.name?.toUpperCase();
  data.user = req.user._id;
  const vector = await Vector.findByIdAndUpdate(id, data);
  res.json({
    msg: 'Correctly updated data.',
    vector,
  });
};
const vectorDelete = async (req = request, res = response) => {
  const { id } = req.params;
  const vectorRemoved = await Vector.findByIdAndUpdate(id, { state: false });
  res.json({ msg: 'Vector successfully removed.', vectorRemoved });
};
module.exports = {
  vectorPost,
  vectorGets,
  vectorGetById,
  vectorPut,
  vectorDelete,
};

const { Router } = require('express');
const { check } = require('express-validator');
const {
  vectorPost,
  vectorGets,
  vectorGetById,
  vectorPut,
  vectorDelete,
} = require('../controllers/vector.controller');
const { thereVectorById } = require('../helpers/db-validators');
const { fieldValidation, validationJWT } = require('../middlewares');

const vectorRouter = Router();

vectorRouter.get('/getVectors', [validationJWT], vectorGets);
vectorRouter.get(
  '/:id',
  [
    validationJWT,
    check('id', 'is not a valid id').isMongoId(),
    check('id').custom(thereVectorById),
    fieldValidation,
  ],
  vectorGetById,
);
vectorRouter.post(
  '/addVector',
  [
    validationJWT,
    check('name', 'Name is required.').not().isEmpty(),
    check('area', 'Area is required.').not().isEmpty(),
    check('activity', 'Activity is required.').not().isEmpty(),
    fieldValidation,
  ],
  vectorPost,
);
vectorRouter.put(
  '/:id',
  [
    validationJWT,
    check('id', 'is not a valid id').isMongoId(),
    check('id').custom(thereVectorById),
    fieldValidation,
  ],
  vectorPut,
);
vectorRouter.delete(
  '/:id',
  [
    validationJWT,
    check('id', 'is not a valid id').isMongoId(),
    check('id').custom(thereVectorById),
    fieldValidation,
  ],
  vectorDelete,
);
module.exports = vectorRouter;
